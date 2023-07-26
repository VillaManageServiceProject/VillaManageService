package VillaManageService.VillaManageService_Backend.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class CommunityCenter {
    @Id
    @Column(unique = true)
    private String id;

    private String password;

    private String name;

    private String contactNumber;

    private String favorite;

    private String department;

    private String centerAddress;
}
