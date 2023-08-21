package VillaManageService.VillaManageService_Backend.user;

//import VillaManageService.VillaManageService_Backend.board.Vote;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Member {
    @Id
    @Column(unique = true)
    private String id;

    private String password;

    private String name;

    private String contactNumber;

    private String favorite;

//    @OneToMany(mappedBy = "member")
//    private List<Vote> votes;
}
