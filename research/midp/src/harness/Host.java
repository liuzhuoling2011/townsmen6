package harness;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.PrintStream;
import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.CRC32;
import javax.imageio.ImageIO;
import javax.microedition.lcdui.Canvas;
import javax.microedition.lcdui.Graphics;

/** Shared state of the headless MIDP reference host. */
public final class Host {
    public static int width = 128;
    public static int height = 128;
    public static File resourceRoot;
    public static final Map<String, String> properties = new HashMap<>();
    public static final Map<String, List<byte[]>> stores = new HashMap<>();
    public static final ArrayDeque<Runnable> serial = new ArrayDeque<>();
    public static Canvas current;
    public static boolean repaintRequested;
    public static boolean destroyed;
    public static int nextImageId;
    public static long clock = 1240000000000L;
    public static PrintStream eventLog;
    public static PrintStream drawLog;
    public static BufferedImage screen;
    public static Graphics screenGraphics;

    private Host() {
    }

    public static long currentTimeMillis() {
        return clock;
    }

    public static void sleep(long ms) {
        if (ms > 0) {
            clock += ms;
        }
    }

    public static String appProperty(String key) {
        return properties.get(key);
    }

    public static InputStream resource(String name) {
        String rel = name.startsWith("/") ? name.substring(1) : name;
        File f = new File(resourceRoot, rel);
        if (!f.isFile()) {
            return null;
        }
        try {
            return new FileInputStream(f);
        } catch (FileNotFoundException e) {
            return null;
        }
    }

    public static void log(String line) {
        if (eventLog != null) {
            eventLog.println("t=" + clock + " " + line);
        }
    }

    public static void logDraw(String line) {
        if (drawLog != null) {
            drawLog.println(line);
        }
    }

    public static String crc(byte[] data) {
        CRC32 c = new CRC32();
        c.update(data);
        return Long.toHexString(c.getValue());
    }

    public static void ensureScreen() {
        if (screen == null || screen.getWidth() != width || screen.getHeight() != height) {
            screen = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    screen.setRGB(x, y, 0xFF000000);
                }
            }
        }
        screenGraphics = new Graphics(screen, "screen");
    }

    public static void paintNow() {
        repaintRequested = false;
        if (current == null) {
            return;
        }
        ensureScreen();
        current.dispatchPaint(screenGraphics);
    }

    public static String screenHash() {
        CRC32 c = new CRC32();
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int p = screen.getRGB(x, y);
                c.update(p >> 16);
                c.update(p >> 8);
                c.update(p);
            }
        }
        return Long.toHexString(c.getValue());
    }

    public static void saveScreen(File out, int scale) throws java.io.IOException {
        BufferedImage big = new BufferedImage(width * scale, height * scale, BufferedImage.TYPE_INT_RGB);
        for (int y = 0; y < height * scale; y++) {
            for (int x = 0; x < width * scale; x++) {
                big.setRGB(x, y, screen.getRGB(x / scale, y / scale));
            }
        }
        ImageIO.write(big, "png", out);
    }

    public static InputStream bytes(byte[] b) {
        return new ByteArrayInputStream(b);
    }
}
