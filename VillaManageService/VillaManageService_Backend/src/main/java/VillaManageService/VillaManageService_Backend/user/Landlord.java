package VillaManageService.VillaManageService_Backend.user;

import jakarta.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Landlord extends Member{
    private String email;

    private int gender;

    private String contactNumberSub;

    private Date birth;

    private String ownedAddress;

    private int ownedAddressDetail;

    private String coOwnerId;
}
