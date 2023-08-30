package VillaManageService.VillaManageService_Backend.building;

import VillaManageService.VillaManageService_Backend.user.Landlord;
import VillaManageService.VillaManageService_Backend.user.Resident;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class House {
    @Id
    @Column(name = "house_id", unique = true)
    private String id; // villaId + addressDetail

    @NotNull
    private int addressDetail;

    private String houseInfo;

    @ManyToOne
    @JoinColumn(name = "villa_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Villa villa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord_id")
    private Landlord landlord;

    @OneToMany(mappedBy = "house", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Resident> residents = new ArrayList<>();
}