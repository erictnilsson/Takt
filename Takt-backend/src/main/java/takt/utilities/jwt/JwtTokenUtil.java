package takt.utilities.jwt;

import takt.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
public class JwtTokenUtil {
    private static final Logger LOGGER = Logger.getLogger(JwtTokenUtil.class.getName());
    private static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    private final String jwtSecret = System.getenv("JWT_SECRET");

    public String getId(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    private Date getExpiration(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String generateToken(User user) {
        String token = null;
        if (user != null && user.getId() != null) {
            token = Jwts.builder().setClaims(new HashMap<>())
                    .setSubject(user.getId())
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                    .signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
        }
        return token;
    }

    public Boolean validateToken(String token, String id) {
        final String userId = getId(token);
        return (userId.equals(id) & !IsTokenExpired(token));
    }

    public String getTokenFromServletRequest(HttpServletRequest request) {
        final String requestTokenHeader = request.getHeader("Authorization");
        String jwtToken = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer "))
            jwtToken = requestTokenHeader.substring(7);

        return jwtToken;
    }

    private Boolean IsTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(getAllClaimsFromToken(token));
    }

    private Claims getAllClaimsFromToken(String token) {
        try {
            return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
        } catch (MalformedJwtException e) {
            LOGGER.log(Level.SEVERE, "Could not fetch token " + token + ": " + e.getMessage(), e);
            return null;
        }
    }
}