package harness;

import java.io.File;
import java.io.PrintStream;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.jar.Manifest;
import javax.microedition.midlet.MIDlet;

/**
 * Headless driver: java harness.Run <midletClass> <resourceDir> <script> <outDir> [width height]
 *
 * Script lines: "<frame> key <code> down|up", "<frame> shot <name>", "<frame> end".
 */
public final class Run {
    public static void main(String[] args) throws Exception {
        String midletClass = args[0];
        Host.resourceRoot = new File(args[1]);
        List<String[]> script = new ArrayList<>();
        for (String line : Files.readAllLines(new File(args[2]).toPath())) {
            line = line.trim();
            if (!line.isEmpty() && !line.startsWith("#")) {
                script.add(line.split("\\s+"));
            }
        }
        File out = new File(args[3]);
        out.mkdirs();
        if (args.length >= 6) {
            Host.width = Integer.parseInt(args[4]);
            Host.height = Integer.parseInt(args[5]);
        }
        File manifest = new File(Host.resourceRoot, "META-INF/MANIFEST.MF");
        if (manifest.isFile()) {
            try (var in = Files.newInputStream(manifest.toPath())) {
                new Manifest(in).getMainAttributes().forEach((k, v) -> Host.properties.put(k.toString(), v.toString()));
            }
        }
        Host.eventLog = new PrintStream(new File(out, "events.log"), "UTF-8");
        Host.drawLog = Boolean.getBoolean("drawlog") ? new PrintStream(new File(out, "draw.log"), "UTF-8") : null;
        PrintStream frames = new PrintStream(new File(out, "frames.log"), "UTF-8");

        MIDlet midlet = (MIDlet) Class.forName(midletClass).getDeclaredConstructor().newInstance();
        var start = MIDlet.class.getDeclaredMethod("startApp");
        start.setAccessible(true);
        start.invoke(midlet);

        int end = 0;
        for (String[] s : script) {
            end = Math.max(end, Integer.parseInt(s[0]));
        }
        int cursor = 0;
        for (int frame = 0; frame <= end && !Host.destroyed; frame++) {
            List<String[]> shots = new ArrayList<>();
            while (cursor < script.size() && Integer.parseInt(script.get(cursor)[0]) == frame) {
                String[] s = script.get(cursor++);
                if (s[1].equals("key")) {
                    Host.log("key " + s[2] + " " + s[3]);
                    Host.current.dispatchKey(Integer.parseInt(s[2]), s[3].equals("down"));
                } else if (s[1].equals("shot")) {
                    shots.add(s);
                }
            }
            if (Host.drawLog != null) {
                Host.drawLog.println("== frame " + frame);
            }
            int n = Host.serial.size();
            for (int i = 0; i < n; i++) {
                Host.serial.pollFirst().run();
            }
            if (Host.repaintRequested) {
                Host.paintNow();
                frames.println(frame + " t=" + Host.clock + " " + Host.screenHash());
            }
            for (String[] s : shots) {
                Host.ensureScreen();
                Host.saveScreen(new File(out, s[2] + ".png"), 3);
            }
        }
        frames.close();
        Host.eventLog.close();
        if (Host.drawLog != null) {
            Host.drawLog.close();
        }
        System.out.println("done frames=" + end + " destroyed=" + Host.destroyed);
    }
}
