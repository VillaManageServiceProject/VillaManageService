package VillaManageService.VillaManageService_Backend.board;

        import lombok.Getter;
        import lombok.NoArgsConstructor;

        import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class GeneralResponseForm {
    private Long generalId;

    private String title;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    // post의 정보를 받아 postResponseDto 생성
    public GeneralResponseForm(General general) {
        this.generalId = general.getGeneralId();
        this.title = general.getTitle();
        this.content = general.getContent();
        this.createdAt = general.getCreatedAt();
        this.modifiedAt = general.getModifiedAt();
    }
}
