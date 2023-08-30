package VillaManageService.VillaManageService_Backend.user;

import VillaManageService.VillaManageService_Backend.building.House;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Resident extends Member{
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "resident_id")
//    private String id;

//    private String address;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "house_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "addressDetail")
    @JsonIdentityReference(alwaysAsId = true) // id만 JSON으로 직렬화
    private House house;

//    private int addressDetail;

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
