package javax.microedition.media;

public interface PlayerListener {
    String END_OF_MEDIA = "endOfMedia";

    void playerUpdate(Player player, String event, Object eventData);
}
