package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.user.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class AnnounceResponseForm {
    private Long announceId;

    private String publisherId;

    private String title;

    private String content;

    private String noticeType;

    private LocalDate dateStart;

    private LocalDate dateEnd;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    // post의 정보를 받아 postResponseDto 생성
    public AnnounceResponseForm(Announce announce) {
        this.announceId = announce.getAnnounceId();
        this.publisherId = announce.getPublisher().getId();
        this.title = announce.getTitle();
        this.content = announce.getContent();
        this.noticeType = announce.getNoticeType();
        this.dateStart = announce.getDateStart();
        this.dateEnd = announce.getDateEnd();
        this.createdAt = announce.getCreatedAt();
        this.modifiedAt = announce.getModifiedAt();
    }
}
