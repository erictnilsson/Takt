package takt.services;

import takt.models.User;
import takt.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public JwtUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Weird to have by Username when we use Id, but w/e
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User user = userRepository.getWithId(id);
        if (user != null) {
            return new org.springframework.security.core.userdetails.User(id,
                    new BCryptPasswordEncoder().encode(user.getId()), new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with id: " + id);
        }
    }
}
