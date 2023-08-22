package VillaManageService.VillaManageService_Backend.user;

import jakarta.servlet.http.HttpServletRequest;
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

    @Autowired
    private MemberRepository memberRepository;

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
            final Member member = memberRepository.findById(request.getId()).get();

            // response token
            return ResponseEntity.ok(new AuthenticationResponse(jwt, member));
        } catch (Exception e) {
            // failed login by incorrect username or password
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Incorrect username or password");
//             throw new BadCredentialsException("Incorrect username or password");
            return null;
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String token = extractTokenFromRequest(request);
        jwtTokenProvider.addBlacklistToken(token);
        return ResponseEntity.ok("Logged out successfully");
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        return bearerToken != null && bearerToken.startsWith("Bearer ") ? bearerToken.substring(7) : null;
    }
}
