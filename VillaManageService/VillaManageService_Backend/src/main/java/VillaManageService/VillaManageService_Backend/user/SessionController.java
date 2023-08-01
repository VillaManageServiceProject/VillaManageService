package VillaManageService.VillaManageService_Backend.user;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SessionController {

    @GetMapping("/checkSession")
    public String checkSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Get the current session (if it exists)

        if (session != null && session.getId() != null) {
            // The session exists and is open for the client (client is logged in)
            String sessionId = (String) session.getId();
            return "Session is open for user: " + sessionId;
        } else {
            // The session does not exist or is not open for the client
            return "No open session for the client.";
        }
    }
}
