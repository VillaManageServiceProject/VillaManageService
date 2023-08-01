package VillaManageService.VillaManageService_Backend.user;

import jakarta.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Resident extends Member{
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
