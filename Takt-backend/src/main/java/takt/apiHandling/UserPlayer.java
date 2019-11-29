package takt.apiHandling;
import com.google.gson.JsonParser;
import takt.models.simples.SimpleDevice;
import takt.utilities.Utils;
import com.wrapper.spotify.enums.ModelObjectType;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.special.SearchResult;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * Handles the playback of a user and the search-function
 */
public class UserPlayer extends ApiHandler {
    private static final Logger LOGGER = Logger.getLogger(UserPlayer.class.getName());

    private boolean isPlaying;
    private SimpleDevice activeDevice;

    public UserPlayer() {
        super();
        isPlaying = false;
    }

    public boolean isPlaying() {
        return this.isPlaying;
    }

    public void setPlaying(boolean isPlaying) {
        this.isPlaying = isPlaying;
    }

    // TODO: Add Javadoc stating the limit(10)
    public SearchResult searchItem(String query, ModelObjectType type) throws IOException, SpotifyWebApiException {
        return executeRequest(api.searchItem(query, type.getType()).limit(10).build());
    }

    // Optional single uri
    public void startResumePlayback(String uri) throws Exception {
        List<String> uris = new ArrayList<>();
        if (uri != null) {
            uris.add(uri);
        }

        startResumePlayback(uris, 0);
    }

    // Optional uris and a position
    public <T> T startResumePlayback(List<String> uris, int position) throws Exception {
        String listString;
        if (activeDevice == null) {
            LOGGER.log(Level.WARNING, "No active device available");
            throw new Exception("No active device available");
        }
        if (uris != null && uris.size() > 0) {
            listString = "[" + uris.stream()
                    .map(uri -> "\"" + uri + "\"")
                    .collect(Collectors.joining(", ")) + "]";

            return executeRequest(api.startResumeUsersPlayback()
                    .uris(new JsonParser().parse(listString).getAsJsonArray())
                    .device_id(activeDevice.getId())
                    .position_ms(position)
                    .build());
        } else
            return executeRequest(api.startResumeUsersPlayback().device_id(activeDevice.getId()).build());
    }

    public void transferPlayback(String deviceId) throws Exception {
        if (deviceId != null && deviceId.length() > 0)
            executeRequest(api.transferUsersPlayback(new JsonParser().parse("[\"" + deviceId + "\"]").getAsJsonArray()).build());
        else
            throw new Exception("Failed to transfer user playback, deviceId is null");
    }

    public void pausPlayback() throws IOException, SpotifyWebApiException {
        executeRequest(api.pauseUsersPlayback().device_id(activeDevice.getId()).build());
    }

    public void setActiveDevice(SimpleDevice device) {
        this.activeDevice = device;
    }

    public void setActiveDevice() {
        activeDevice = this.getAvailableDevices()
                .stream()
                .filter(SimpleDevice::getIsActive)
                .findFirst()
                .orElse(null);
    }

    public ArrayList<SimpleDevice> getAvailableDevices() {
        ArrayList<SimpleDevice> devices = new ArrayList<>();
        devices.addAll(getDevices().stream()
                .filter(device -> !device.getId().equals(activeDevice == null ? "" : activeDevice.getId()))
                .collect(Collectors.toList()));

        // The active device is sent last in the list
        if (activeDevice != null)
            devices.add(activeDevice);

        return devices;
    }

    private ArrayList<SimpleDevice> getDevices() {
        ArrayList<SimpleDevice> availableDevices = new ArrayList<>();
        try {
            availableDevices = Utils
                    .simplifyDevices(executeRequest(api.getUsersAvailableDevices().build()));
        } catch (IOException | SpotifyWebApiException e) {
            LOGGER.log(Level.SEVERE, "Could not fetch available devices for user", e);
            e.printStackTrace();
        }
        return availableDevices;
    }
}
