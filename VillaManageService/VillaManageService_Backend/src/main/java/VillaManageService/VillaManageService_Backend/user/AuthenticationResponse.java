package VillaManageService.VillaManageService_Backend.user;

import lombok.Getter;

@Getter
public class AuthenticationResponse {

    private final String jwt;

    private final Member member;

    public AuthenticationResponse(String jwt, Member member) {
        this.jwt = jwt;
        this.member = member;
    }
}
