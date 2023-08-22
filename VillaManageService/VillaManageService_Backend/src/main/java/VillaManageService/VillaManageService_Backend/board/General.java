package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.user.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class General extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long generalId;

    private String villaId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "publisher", referencedColumnName = "id")
    private Member publisher;

    private String title;

    private String noticeType;

//    private String relatedMemberId;

    private String content;

    private LocalDate dateStart;

    private LocalDate dateEnd;

    // requestDto 정보를 가져와서 entity 만들 때 사용
    public General(GeneralCreateForm generalCreateForm, Member publisher) {
        this.publisher = publisher;
        this.villaId = generalCreateForm.getVillaId();
        this.title = generalCreateForm.getTitle();
        this.noticeType = generalCreateForm.getNoticeType();
        this.content = generalCreateForm.getContent();
        this.dateStart = generalCreateForm.getDateStart();
        this.dateEnd = generalCreateForm.getDateEnd();
    }

    // 업데이트 메소드
    public void updateGeneral(GeneralCreateForm generalCreateForm) {
        this.title = generalCreateForm.getTitle();
        this.content = generalCreateForm.getContent();
        this.noticeType = generalCreateForm.getNoticeType();
        this.dateStart = generalCreateForm.getDateStart();
        this.dateEnd = generalCreateForm.getDateEnd();
    }
}
