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
public class Announce extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long announceId;

    private String villaId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "publisher", referencedColumnName = "id")
    private Member publisher;

    @Column(columnDefinition = "TEXT")
    private String title;

    private String noticeType;

//    private String relatedMemberId;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDate dateStart;

    private LocalDate dateEnd;

    // requestDto 정보를 가져와서 entity 만들 때 사용
    public Announce(AnnounceCreateForm announceCreateForm, Member publisher) {
        this.publisher = publisher;
        this.villaId = announceCreateForm.getVillaId();
        this.title = announceCreateForm.getTitle();
        this.noticeType = announceCreateForm.getNoticeType();
        this.content = announceCreateForm.getContent();
        this.dateStart = announceCreateForm.getDateStart();
        this.dateEnd = announceCreateForm.getDateEnd();
    }

    // 업데이트 메소드
    public void updateAnnounce(AnnounceCreateForm announceCreateForm) {
        this.title = announceCreateForm.getTitle();
        this.content = announceCreateForm.getContent();
        this.noticeType = announceCreateForm.getNoticeType();
        this.dateStart = announceCreateForm.getDateStart();
        this.dateEnd = announceCreateForm.getDateEnd();
    }
}
