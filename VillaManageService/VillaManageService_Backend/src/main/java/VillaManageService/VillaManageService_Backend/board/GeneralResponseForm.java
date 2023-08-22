package VillaManageService.VillaManageService_Backend.board;

        import VillaManageService.VillaManageService_Backend.user.Member;
        import lombok.Getter;
        import lombok.NoArgsConstructor;

        import java.time.LocalDate;
        import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class GeneralResponseForm {
    private Long generalId;

    private String publisherId;

    private String title;

    private String content;

    private String noticeType;

    private LocalDate dateStart;

    private LocalDate dateEnd;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    // post의 정보를 받아 postResponseDto 생성
    public GeneralResponseForm(General general) {
        this.generalId = general.getGeneralId();
        this.publisherId = general.getPublisher().getId();
        this.title = general.getTitle();
        this.content = general.getContent();
        this.noticeType = general.getNoticeType();
        this.dateStart = general.getDateStart();
        this.dateEnd = general.getDateEnd();
        this.createdAt = general.getCreatedAt();
        this.modifiedAt = general.getModifiedAt();
    }
}
