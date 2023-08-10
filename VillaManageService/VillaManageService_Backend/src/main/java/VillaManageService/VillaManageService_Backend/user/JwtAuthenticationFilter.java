package VillaManageService.VillaManageService_Backend.user;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // about all request
        // just set security context when request has jwt token(=signed in)
        try{
            String token = getTokenFromRequest(request);
            if (token != null) {
                if(jwtTokenProvider.validateToken(token)) {
                    UserDetails userDetails = jwtTokenProvider.getUserDetailsFromToken(token);
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                else throw new SignatureException("no validation");
            }
        } catch (ExpiredJwtException | SignatureException | NullPointerException e) {
            // not signed-in user or incorrect request
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("failed authentication");
            return;
        }
        filterChain.doFilter(request, response);
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken;
        try {
            bearerToken = request.getHeader("Authorization");
        } catch (NullPointerException e) {throw e;}
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        return request.getServletPath().equals("/authenticate");
//    }
}