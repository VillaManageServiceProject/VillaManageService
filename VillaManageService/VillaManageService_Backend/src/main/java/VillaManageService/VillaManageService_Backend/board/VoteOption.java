//package VillaManageService.VillaManageService_Backend.board;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.util.List;
//
//@Getter
//@Setter
//@Entity
//public class VoteOption {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "vote_option_id", unique = true)
//    private Long id;
//
//    private String optionText;
//
//    @OneToMany(mappedBy = "voteOption")
//    private List<Vote> votes;
//
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "survey_id")
//    private Survey survey;
//}