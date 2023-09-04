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

    private String contactNumberSub;

    private Date birth;

    private String relationHousehold;

    private Boolean isContractor;

    private Boolean isMaster;

    private Boolean isOwner;

    @Override
    public void updateMember(MemberRequestForm requestForm) {
        this.setPassword(requestForm.getPassword1());
        this.setName(requestForm.getName());
        this.setContactNumber(((ResidentCreateForm)requestForm).getContactNumber());
        this.setContactNumberSub(((ResidentCreateForm)requestForm).getContactNumberSub());
        this.setRelationHousehold(((ResidentCreateForm)requestForm).getRelationHousehold());
        this.setIsContractor(((ResidentCreateForm)requestForm).getIsContractor());
        this.setIsMaster(((ResidentCreateForm)requestForm).getIsMaster());
        this.setIsOwner(((ResidentCreateForm)requestForm).getIsOwner());
        this.setFavorites(requestForm.getFavorites());
    }
}
