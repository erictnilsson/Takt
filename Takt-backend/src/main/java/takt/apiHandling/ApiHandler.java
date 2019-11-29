package takt.apiHandling;

import takt.models.enums.Scope;
import takt.utilities.Utils;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.SpotifyHttpManager;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import com.wrapper.spotify.model_objects.specification.User;
import com.wrapper.spotify.requests.AbstractRequest;
import com.wrapper.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;

import java.io.IOException;
import java.net.URI;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ApiHandler {
    private static final Logger LOGGER = Logger.getLogger(ApiHandler.class.getName());
    protected final SpotifyApi api;
    private final Scope[] scopes;

    private final String clientId;
    private final String clientSecret;
    private final String clientUri;

    public ApiHandler() {
        this.clientId = System.getenv("CLIENT_ID");
        this.clientSecret = System.getenv("CLIENT_SECRET");
        this.clientUri = System.getenv("CLIENT_URI");

        this.api = initApi();
        this.scopes = new Scope[]{
                Scope.USER_READ_EMAIL,
                Scope.USER_READ_PRIVATE,
                Scope.STREAMING,
                Scope.APP_REMOTE_CONTROL,
                Scope.USER_MODIFY_PLAYBACK_STATE,
                Scope.USER_READ_PLAYBACK_STATE,
                Scope.STREAMING
        };
    }

    public URI getAuthorizationCodeUri() throws IOException, SpotifyWebApiException {
        final AuthorizationCodeUriRequest req = api.authorizationCodeUri()
                .state("")
                .scope(Utils.stringifyScopes(scopes))
                .show_dialog(false)
                .build();

        return this.executeRequest(req);
    }

    public AuthorizationCodeCredentials getAuthorizationCode(String code) throws IOException, SpotifyWebApiException {
        return this.executeRequest(api.authorizationCode(code).build());
    }

    public AuthorizationCodeCredentials getRefreshCode() throws IOException, SpotifyWebApiException {
        return this.executeRequest(api.authorizationCodeRefresh().build());
    }

    public void setAccessToken(String token) throws Exception {
        if (token != null && token.length() > 0)
            api.setAccessToken(token);
        else
            throw new Exception("Could not set Access Token: invalid token provided");
    }

    public void setRefreshToken(String token) throws Exception {
        if (token != null && token.length() > 0)
            api.setRefreshToken(token);
        else
            throw new Exception("Could not set Refresh Token: invalid token provided");
    }

    public User getUserMetadata() throws IOException, SpotifyWebApiException {
        return this.executeRequest(api.getCurrentUsersProfile().build());
    }

    <T> T executeRequest(AbstractRequest req) throws IOException, SpotifyWebApiException {
        return req.execute();
    }

    private SpotifyApi initApi() {
        SpotifyApi api = null;

        // load credentials from config file
        try {

            api = new SpotifyApi.Builder()
                    .setClientId(clientId)
                    .setClientSecret(clientSecret)
                    .setRedirectUri(SpotifyHttpManager.makeUri(clientUri))
                    .build();

        } catch (NullPointerException e) {
            LOGGER.log(Level.SEVERE, e.getMessage(), e);
            e.printStackTrace();
        }
        return api;
    }

}

