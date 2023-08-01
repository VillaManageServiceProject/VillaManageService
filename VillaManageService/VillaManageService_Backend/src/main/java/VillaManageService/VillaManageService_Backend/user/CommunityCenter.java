package VillaManageService.VillaManageService_Backend.user;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class CommunityCenter extends Member{
    private String department;

    private String centerAddress;
}
