package VillaManageService.VillaManageService_Backend.building;

import VillaManageService.VillaManageService_Backend.user.BuildingManager;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Villa {
    @Id
    @Column(name = "villa_id", unique = true)
    private String id;

    @NotNull
    private String address;

    @NotNull
    private String localCC;

    private String villaInfo;

    @OneToMany(mappedBy = "villa", cascade = CascadeType.ALL)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<House> houses = new HashSet<>();

    @OneToMany(mappedBy = "manageVilla", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<BuildingManager> buildingManagers = new ArrayList<>();
}
