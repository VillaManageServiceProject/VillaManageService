package VillaManageService.VillaManageService_Backend.villa;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Villa {
    @Id
    @Column(name = "villa_id", unique = true)
    private String id;

    @NotNull
    private String address;

    private String villaInfo;

    @OneToMany(mappedBy = "villa")
//    @JoinColumn(name = "villa_id")
    private List<House> housees = new ArrayList<>();
}

@Getter
@Setter
@Entity
class House extends Villa {
    @NotNull
    private int addressDetail;

    private String houseInfo;

    @ManyToOne
    @JoinColumn(name = "villa_id", insertable = false, updatable = false)
    private Villa villa;
}
