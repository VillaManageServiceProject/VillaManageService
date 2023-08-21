package VillaManageService.VillaManageService_Backend.board;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class General extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long generalId;

    private String villaId;

    private String postType;

    private String publisherId;

    private String title;

    private String noticeType;

//    private String relatedMemberId;

    private String content;

    // requestDto 정보를 가져와서 entity 만들 때 사용
    public General(GeneralCreateForm generalCreateForm, String publisherId) {
        this.publisherId = publisherId;
        this.villaId = generalCreateForm.getVillaId();
        this.title = generalCreateForm.getTitle();
        this.noticeType = generalCreateForm.getNoticeType();
        this.content = generalCreateForm.getContent();
    }

    // 업데이트 메소드
    public void updateGeneral(GeneralCreateForm generalCreateForm) {
        this.title = generalCreateForm.getTitle();
        this.content = generalCreateForm.getContent();
    }
}
