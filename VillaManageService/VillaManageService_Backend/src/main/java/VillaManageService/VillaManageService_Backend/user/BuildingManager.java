package VillaManageService.VillaManageService_Backend.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class BuildingManager {
    @Id
    @Column(unique = true)
    private String id;

    private String password;

    private String name;

    private String contact_number;

    private String favorite;

    private String recent_search;

    private String department;

    private String address;
}
