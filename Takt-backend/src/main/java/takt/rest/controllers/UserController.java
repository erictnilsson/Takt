package takt.rest.controllers;

import takt.models.Room;
import takt.models.User;
import takt.models.messages.RestResponse;
import takt.repositories.RoomRepository;
import takt.repositories.UserRepository;
import takt.utilities.jwt.JwtTokenUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
public class UserController {
    private static final Logger LOGGER = Logger.getLogger(UserController.class.getName());
    private RoomRepository roomRepository;
    private UserRepository userRepository;
    private JwtTokenUtil jwtTokenUtil;

    public UserController(RoomRepository roomRepository, UserRepository userRepository, JwtTokenUtil jwtTokenUtil) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({Exception.class})
    public Exception handleException(HttpServletRequest request, Exception ex) {
        LOGGER.log(Level.SEVERE, request.getRequestURL() + " raised " + ex.toString(), ex);
        return ex;
    }

    @CrossOrigin(origins = "https://takt-application.herokuapp.com/")
    @GetMapping("/api/user")
    public RestResponse getDisplayName(HttpServletRequest request) throws Exception {
        String token = jwtTokenUtil.getTokenFromServletRequest(request);
        if (token != null) {
            String userId = jwtTokenUtil.getId(token);
            User user = userRepository.getWithId(userId);
            return new RestResponse(user.getDisplayName());
        } else {
            throw new Exception("No token provided");
        }

    }

    @CrossOrigin(origins = "https://takt-application.herokuapp.com/")
    @GetMapping("/api/user/create_room")
    public RestResponse createRoom() {
        Room room = new Room();
        roomRepository.add(room);
        return new RestResponse(room.getId());
    }

    @CrossOrigin(origins = "https://takt-application.herokuapp.com/")
    @GetMapping("/api/user/join_room")
    public RestResponse joinRoom(@RequestParam(value = "id") String id) throws Exception {
        Room room = roomRepository.get(id);
        if (room != null && room.getAllUsers().size() < 5)
            return new RestResponse(true);
        else
            throw new Exception("Room does not exist or is not available");
    }
}
