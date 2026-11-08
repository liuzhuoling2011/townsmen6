package javax.microedition.media;

public interface Player {
    int UNREALIZED = 100;
    int REALIZED = 200;
    int PREFETCHED = 300;
    int STARTED = 400;
    int CLOSED = 0;

    void realize() throws MediaException;

    void prefetch() throws MediaException;

    void start() throws MediaException;

    void stop() throws MediaException;

    void deallocate();

    void close();

    int getState();

    Control getControl(String type);

    void addPlayerListener(PlayerListener listener);

    void removePlayerListener(PlayerListener listener);

    void setLoopCount(int count);
}
