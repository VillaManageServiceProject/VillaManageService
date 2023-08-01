package VillaManageService.VillaManageService_Backend.user;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class BuildingManager extends Member {
    private String department;

    private String manageAddress;
}
