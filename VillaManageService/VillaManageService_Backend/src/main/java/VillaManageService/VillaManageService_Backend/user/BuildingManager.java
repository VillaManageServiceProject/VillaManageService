package VillaManageService.VillaManageService_Backend.user;

import VillaManageService.VillaManageService_Backend.building.Villa;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class BuildingManager extends Member {
    private String department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "villa_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Villa manageVilla;

    @Override
    public void updateMember(MemberRequestForm requestForm) {
        this.setPassword(requestForm.getPassword1());
        this.setName(requestForm.getName());
        this.setContactNumber(((BuildingManagerCreateForm)requestForm).getContactNumber());
        this.setDepartment(((BuildingManagerCreateForm)requestForm).getDepartment());
        this.setFavorites(requestForm.getFavorites());
    }
}
