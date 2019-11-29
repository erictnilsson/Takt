package takt.apiHandling;

import takt.models.Room;
import takt.models.simples.SimpleTrack;
import com.wrapper.spotify.SpotifyApiThreading;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.concurrent.Callable;
import java.util.logging.Level;
import java.util.logging.Logger;

public class RoomPlayer {
    private static final Logger LOGGER = Logger.getLogger(RoomPlayer.class.getName());

    private final LinkedList<SimpleTrack> trackQueue;
    private SimpleTrack trackPointer; // Points to the last sent track-uri
    private SimpleTrack currentTrack; // Points to the track currently playing
    private final Room room;

    private int timestamp; // System timestamp of when the last uris were invoked

    public RoomPlayer(Room room) {
        this.room = room;
        trackQueue = new LinkedList<>();
    }

    public void addTrackToQueue(SimpleTrack track) {
        if (trackQueue.peekFirst() == null) // If the header is empty: set the pointer to the added track
            trackPointer = track;

        trackQueue.add(track);
    }

    public boolean isPlaying() {
        return currentTrack != null;
    }

    public int getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(int timestamp) {
        this.timestamp = timestamp;
    }

    public SimpleTrack getCurrentTrack() {
        return currentTrack;
    }

    public void play() {
        SimpleTrack track = trackQueue.peekFirst();
        if (track == trackPointer || trackPointer == null) {
            // Point to tail of the queue, indicating where the api-queue ends (what tracks we've sent)
            trackPointer = trackQueue.getLast();

            // Grab the queue's track-uris that's gonna be played
            List<String> uris = new ArrayList<>();
            trackQueue.forEach(iTrack -> uris.add(iTrack.getUri()));

            // Send the track-uris to the Spotify Api
            playUris(uris);
        }
        try {
            currentTrack = trackQueue.pop();
        } catch (NoSuchElementException e) {
            currentTrack = null;
        }
    }

    public int getCurrentTrackDurationMs() {
        if (currentTrack != null)
            return currentTrack.getDurationMs();
        else
            return 0;
    }

    public SimpleTrack[] getQueue() {
        return trackQueue.toArray(new SimpleTrack[trackQueue.size()]);
    }

    public List<String> getTrackQueueUris() {
        ArrayList<String> uris = new ArrayList<>();
        // If there is an active playback then add the current track's uri at [0]
        if (isPlaying())
            uris.add(currentTrack.getUri());

        trackQueue.forEach(track -> uris.add(track.getUri()));
        return uris;
    }

    private void playUris(List<String> uris) {
        if (uris.size() > 0) {
            // Gather all active users' startResumePlayback()-request in an ArrayList
            List<Callable<String>> callableRequests = new ArrayList<>();
            room.getAllUsers().forEach(user -> {
                UserPlayer userPlayer = user.getPlayer();
                if (userPlayer.isPlaying())
                    callableRequests.add(() -> userPlayer.startResumePlayback(uris, 0));
            });

            try {
                // InvokeAll user's startResumePlayback()
                SpotifyApiThreading.THREADPOOL.invokeAll(callableRequests);
                this.timestamp = (int) System.currentTimeMillis() + 305; // set timestamp of when the uris were invoked
            } catch (InterruptedException e) {
                LOGGER.log(Level.SEVERE, e.getMessage() + " when invoking room " + room.getId() + "'s users playbacks", e);
            }
        } else {
            LOGGER.log(Level.WARNING, "TrackQueue is empty when trying to playUris()", uris);
        }
    }
}
