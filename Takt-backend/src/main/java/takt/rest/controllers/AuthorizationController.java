package takt.rest.controllers;

import takt.apiHandling.ApiHandler;
import takt.apiHandling.UserPlayer;
import takt.models.User;
import takt.models.messages.JwtResponse;
import takt.repositories.UserRepository;
import takt.utilities.jwt.JwtTokenUtil;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@CrossOrigin
public class AuthorizationController {
    private static final Logger LOGGER = Logger.getLogger(AuthorizationController.class.getName());
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;

    public AuthorizationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
    }

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({Exception.class})
    public Exception handleException(HttpServletRequest request, Exception ex) {
        LOGGER.log(Level.SEVERE, request.getRequestURL() + " raised " + ex.toString(), ex);
        return ex;
    }

    @GetMapping("/api/auth/get_auth_uri")
    public URI getAuthUri() throws IOException, SpotifyWebApiException {
        return new ApiHandler().getAuthorizationCodeUri();
    }

    @GetMapping("/api/auth/authenticate")
    public ResponseEntity<?> authenticate(@RequestParam(value = "code") String code) throws Exception {
        String token;

        User user = createUser(code);
        userRepository.add(user);

        token = generateToken(user);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @GetMapping("/api/auth/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) throws Exception {
        String token = jwtTokenUtil.getTokenFromServletRequest(request);
        if (token != null) {
            String userId = jwtTokenUtil.getId(token);
            userRepository.remove(userId);
            return ResponseEntity.ok(new JwtResponse(userId));
        } else {
            LOGGER.log(Level.WARNING, "No token provided for " + request);
            return ResponseEntity.status(404).body(new JwtResponse("No token provided"));
        }
    }


    private User createUser(String authcode) throws Exception {
        User user;

        // Create a player from the credentials from the provided authCode
        UserPlayer player = new UserPlayer();
        AuthorizationCodeCredentials credentials = player.getAuthorizationCode(authcode);

        // Set the tokens for the player
        player.setAccessToken(credentials.getAccessToken());
        player.setRefreshToken(credentials.getRefreshToken());

        // Get the displayName of the user then add the player to the User
        com.wrapper.spotify.model_objects.specification.User spotifyUser = player.getUserMetadata();
        String displayName = spotifyUser.getDisplayName();
        user = new User(displayName, player);
        return user;
    }

    private String generateToken(User user) throws Exception {
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getId(), user.getId()));
            SecurityContextHolder.getContext().setAuthentication(auth);

            return jwtTokenUtil.generateToken(user);
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            e.printStackTrace();
            throw new Exception("INVALID_CREDENTIALS", e);
        } catch (NullPointerException e) {
            throw new Exception("NULL SOMEWhERE", e);
        } catch (AuthenticationException e) {
            e.printStackTrace();
            return null;
        }
    }
}
