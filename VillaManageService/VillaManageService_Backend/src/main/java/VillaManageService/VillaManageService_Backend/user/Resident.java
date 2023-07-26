package VillaManageService.VillaManageService_Backend.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Resident {
    @Id
    @Column(unique = true)
    private String id;

    private String password;

    private String name;

    private String favorite;

    private String address;

    private int addressDetail;

    private String email;

    private int gender;

    private String contactNumber;

    private String contactNumberSub;

    private Date birth;

    private String relationHousehold;

    private Boolean isContractor;

    private Boolean isMaster;

    private Boolean isOwner;
}
