package VillaManageService.VillaManageService_Backend.user;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private MemberUserDetailsService userDetailsService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody LoginDto request, HttpServletResponse response) throws IOException {
        // about user who hasn't JWT token(=not signed in)
        try {
            // check member by id, password
            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(request.getId(), request.getPassword());
            Authentication authenticated = authenticationManager.authenticate(authRequest);

            // set security context
            SecurityContextHolder.getContext().setAuthentication(authenticated);

            // generate token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getId());
            final String jwt = jwtTokenProvider.generateToken(userDetails);

            // response token
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        } catch (Exception e) {
            // failed login by incorrect username or password
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Incorrect username or password");
//             throw new BadCredentialsException("Incorrect username or password");
            return null;
        }
    }
}
