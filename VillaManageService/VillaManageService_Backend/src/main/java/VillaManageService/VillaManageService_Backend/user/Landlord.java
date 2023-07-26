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
public class Landlord {
    @Id
    @Column(unique = true)
    private String id;

    private String password;

    private String name;

    private String contactNumber;

    private String favorite;

    private String email;

    private int gender;

    private String contactNumberSub;

    private Date birth;

    private String ownedAddress;

    private int ownedAddressDetail;

    private String coOwnerId;
}
