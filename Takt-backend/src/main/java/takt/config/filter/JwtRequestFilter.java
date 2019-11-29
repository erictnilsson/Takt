package takt.config.filter;

import takt.utilities.jwt.JwtTokenUtil;
import takt.services.JwtUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private static final Logger LOGGER = Logger.getLogger(JwtRequestFilter.class.getName());
    private final JwtUserDetailsService jwtUserDetailsService;
    private final JwtTokenUtil jwtTokenUtil;

    public JwtRequestFilter(JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil) {
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String userId = null;
        String jwtToken = jwtTokenUtil.getTokenFromServletRequest(request);

        try {
            if (jwtToken != null)
                userId = jwtTokenUtil.getId(jwtToken);
        } catch (IllegalArgumentException e) {
            LOGGER.log(Level.SEVERE, "Unable to get JWT Token", e);
        } catch (ExpiredJwtException e) {
            LOGGER.log(Level.SEVERE, "JWT Token has expired", e);
        }

        // Once we have the token, validate it
        if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(userId);

            // If the token is valid, configure Spring Security to manually set the authentication
            if (jwtTokenUtil.validateToken(jwtToken, userId)) {
                UsernamePasswordAuthenticationToken upaToken = new UsernamePasswordAuthenticationToken(
                        userId, null, userDetails.getAuthorities());

                upaToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // After setting the Authentication in the context, specify that the current user is authenticated
                SecurityContextHolder.getContext().setAuthentication(upaToken);
            } else {
                LOGGER.log(Level.SEVERE, "Token not valid", jwtToken + " ; " + userId);
            }
        }
        filterChain.doFilter(request, response);
    }
}
