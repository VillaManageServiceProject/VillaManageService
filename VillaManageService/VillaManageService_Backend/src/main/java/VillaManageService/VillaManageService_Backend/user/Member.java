package VillaManageService.VillaManageService_Backend.user;

//import VillaManageService.VillaManageService_Backend.board.Vote;
import VillaManageService.VillaManageService_Backend.chat.ChatRoom;
import VillaManageService.VillaManageService_Backend.util.ListConverter;
import VillaManageService.VillaManageService_Backend.util.ListMapConverter;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Member {
    @Id
    @Column(unique = true)
    private String id;

    private String password;

    private String name;

    private String contactNumber;

    @Convert(converter = ListConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> favorites = new ArrayList<>();

    @ElementCollection(targetClass = MemberRole.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
//    @CollectionTable(name = "member_roles", joinColumns = @JoinColumn(name = "member_id"))
    @Column(name = "role")
    private Set<MemberRole> roles = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<ChatRoom> chatRooms = new ArrayList<>();

//    @OneToMany(mappedBy = "member")
//    private List<Vote> votes;

    public abstract void updateMember(MemberRequestForm requestForm);
}
