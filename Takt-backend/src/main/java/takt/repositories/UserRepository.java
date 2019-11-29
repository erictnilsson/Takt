package takt.repositories;

import takt.models.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

@Repository
public class UserRepository {
    private static final Logger LOGGER = Logger.getLogger(UserRepository.class.getName());
    private final Map<String, User> userMap; // Map<id, User>

    public UserRepository() {
        this.userMap = new ConcurrentHashMap<>();
    }

    public void add(User user) {
        if (isPresent(user))
            userMap.replace(user.getId(), user);
        else
            userMap.put(user.getId(), user);
    }

    public User getWithId(String id) {
        return userMap.get(id);
    }

    public User getWithSessionId(String sessionId) {
        User user = null;
        try {
            user = getAllUsers().stream()
                    .filter(iUser -> iUser.getSessionId().equals(sessionId))
                    .findFirst()
                    .orElse(null);
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Cannot get user with session id " + sessionId + ": " + e.getMessage(), e);
        }
        return user;
    }

    public void remove(String id) {
        userMap.remove(id);
    }

    private boolean isPresent(User user) {
        return userMap.containsKey(user.getId());
    }

    private ArrayList<User> getAllUsers() {
        return new ArrayList<User>(userMap.values());
    }
}