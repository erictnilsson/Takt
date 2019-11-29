package takt.utilities;

import takt.models.enums.Scope;
import takt.models.simples.SimpleDevice;
import takt.models.simples.SimpleTrack;
import com.wrapper.spotify.model_objects.miscellaneous.Device;
import com.wrapper.spotify.model_objects.special.SearchResult;
import com.wrapper.spotify.model_objects.specification.ArtistSimplified;
import com.wrapper.spotify.model_objects.specification.Track;
import org.apache.commons.lang3.RandomStringUtils;

import java.util.ArrayList;
import java.util.stream.Stream;

public final class Utils {

    public static String stringifyScopes(Scope[] scopes) {
        StringBuilder scopeString = new StringBuilder();

        for (Scope scope : scopes) {
            if (scope != null)
                scopeString.append(scope.getValue()).append(", ");
        }
        return scopeString.toString();
    }

    public static String generateRandomString(int length) {
        return RandomStringUtils.random(length, true, true);
    }

    public static ArrayList<SimpleTrack> simplifyTrackResult(SearchResult result) {
        ArrayList<SimpleTrack> simpleTrackList = new ArrayList<>();
        for (Track item : result.getTracks().getItems()) {
            SimpleTrack simpleTrack = new SimpleTrack();

            simpleTrack.setArtists(Stream.of(item.getArtists())
                    .map(ArtistSimplified::getName)
                    .toArray(String[]::new));

            simpleTrack.setDurationMs(item.getDurationMs());
            simpleTrack.setHref(item.getHref());
            simpleTrack.setId(item.getId());
            simpleTrack.setIsExplicit(item.getIsExplicit());
            simpleTrack.setName(item.getName());
            simpleTrack.setPopularity(item.getPopularity());
            simpleTrack.setPreviewUrl(item.getPreviewUrl());
            simpleTrack.setPreviewUrl(item.getPreviewUrl());
            simpleTrack.setTrackNumber(item.getTrackNumber());
            simpleTrack.setType(item.getType().toString());
            simpleTrack.setUri(item.getUri());

            simpleTrackList.add(simpleTrack);
        }
        return simpleTrackList;
    }

    public static ArrayList<SimpleDevice> simplifyDevices(Device[] devices) {
        ArrayList<SimpleDevice> simpleDeviceList = new ArrayList<>();
        for (Device device : devices) {
            if (device != null && !device.getIs_restricted()) {
                SimpleDevice simpleDevice = new SimpleDevice();
                simpleDevice.setId(device.getId());
                simpleDevice.setIsActive(device.getIs_active());
                simpleDevice.setIsRestricted(device.getIs_restricted());
                simpleDevice.setName(device.getName());
                simpleDevice.setType(device.getType());

                simpleDeviceList.add(simpleDevice);
            }
        }
        return simpleDeviceList;
    }
}
