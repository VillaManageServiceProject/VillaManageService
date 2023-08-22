//package VillaManageService.VillaManageService_Backend.board;
//
//import VillaManageService.VillaManageService_Backend.user.Member;
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//@Entity
//public class Vote {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;
//
//    @ManyToOne
//    @JoinColumn(name = "vote_option_id")
//    private VoteOption voteOption;
//}