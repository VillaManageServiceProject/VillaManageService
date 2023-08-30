package VillaManageService.VillaManageService_Backend.user;

import VillaManageService.VillaManageService_Backend.building.House;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@Entity
public class Landlord extends Member{
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "landlord_id")
//    private String id;

    private String email;

    private int gender;

    private String contactNumberSub;

    private Date birth;

//    private String ownedAddress;
    @OneToMany(mappedBy = "landlord", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "house_id")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<House> houses = new HashSet<>();

//    private int ownedAddressDetail;

    private String coOwnerId;
}
