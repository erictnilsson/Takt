package takt.models.simples;

import java.io.Serializable;

public class SimplePlaybackContext implements Serializable {
    private SimpleTrack track;
    private int positionMs;

    public SimplePlaybackContext() {
    }

    public SimplePlaybackContext(SimpleTrack track, int positionMs) {
        setPositionMs(positionMs);
        setTrack(track);
    }

    public SimpleTrack getTrack() {
        return track;
    }

    public void setTrack(SimpleTrack track) {
        this.track = track;
    }

    public int getPositionMs() {
        return positionMs;
    }

    public void setPositionMs(int positionMs) {
        this.positionMs = positionMs;
    }
}
