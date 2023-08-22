package VillaManageService.VillaManageService_Backend.user;

import lombok.Getter;

@Getter
public enum MemberRole {
    ADMIN("ROLE_ADMIN"),
    BUILDING_MANAGER("ROLE_BM"),
    COMMUNITY_CENTER("ROLE_CC"),
    LANDLORD("ROLE_LL"),
    RESIDENT("ROLE_RE");

    MemberRole(String value) {
        this.value = value;
    }

    private String value;
}
