package VillaManageService.VillaManageService_Backend.user;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.SecureRandom;
import java.util.*;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//    @PostConstruct
//    protected void init() {
//        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
//    }

    private final UserDetailsService userDetailsService;

    private final Set<String> blacklistedTokens = Collections.synchronizedSet(new HashSet<>());

    // 토큰 생성
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
//        claims.put("email", userDetails.getEmail());
        return createToken(claims, userDetails.getUsername());
    }

    public class SecretKeyGenerator {
        public static String generateSecretKey() {
            SecureRandom random = new SecureRandom();
            byte[] keyBytes = new byte[32]; // 256 bits
            random.nextBytes(keyBytes);
            return Base64.getEncoder().encodeToString(keyBytes);
        }
    }

    // 토큰 만료 시간 및 서명을 사용하여 토큰 생성
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10시간 유효기간
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // 토큰에서 정보 추출 (예: 사용자 이름)
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).get("email", String.class);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // 토큰 유효성 검사 (만료 여부, 사용자 이름 일치 여부)
    public Boolean validateToken(String token) {
        final String username = extractUsername(token);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token) && !isTokenBlacklisted(token));
    }

    public UserDetails getUserDetailsFromToken(String token) {
        String username = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
        // 여기에서 username을 사용하여 사용자 세부 정보를 로드할 수 있습니다.
        return userDetailsService.loadUserByUsername(username);
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public void addBlacklistToken(String token) {
        blacklistedTokens.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}
