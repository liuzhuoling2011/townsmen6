package javax.microedition.media;

import harness.Host;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import javax.microedition.media.control.VolumeControl;

/** Silent players that follow the MIDP state machine and log every transition. */
public class Manager {
    public static Player createPlayer(InputStream in, String type) throws IOException, MediaException {
        byte[] data = in.readAllBytes();
        SilentPlayer p = new SilentPlayer(type, data.length, Host.crc(data));
        Host.log("createPlayer#" + p.id + " " + type + " " + data.length + " " + Host.crc(data));
        return p;
    }

    static final class SilentPlayer implements Player, VolumeControl {
        private static int nextId = 0;
        final int id = nextId++;
        private final List<PlayerListener> listeners = new ArrayList<>();
        private int state = UNREALIZED;
        private int level = 100;

        SilentPlayer(String type, int length, String crc) {
        }

        public void realize() {
            if (state == UNREALIZED) {
                state = REALIZED;
            }
        }

        public void prefetch() {
            realize();
            if (state == REALIZED) {
                state = PREFETCHED;
            }
        }

        public void start() {
            prefetch();
            state = STARTED;
            Host.log("player#" + id + " start");
        }

        public void stop() {
            if (state == STARTED) {
                state = PREFETCHED;
            }
            Host.log("player#" + id + " stop");
        }

        public void deallocate() {
            if (state >= PREFETCHED) {
                state = REALIZED;
            }
        }

        public void close() {
            state = CLOSED;
            Host.log("player#" + id + " close");
        }

        public int getState() {
            return state;
        }

        public Control getControl(String type) {
            return type.endsWith("VolumeControl") ? this : null;
        }

        public void addPlayerListener(PlayerListener l) {
            listeners.add(l);
        }

        public void removePlayerListener(PlayerListener l) {
            listeners.remove(l);
        }

        public void setLoopCount(int count) {
        }

        public int setLevel(int l) {
            level = l;
            return l;
        }

        public int getLevel() {
            return level;
        }

        public void setMute(boolean m) {
        }

        public boolean isMuted() {
            return false;
        }
    }
}
