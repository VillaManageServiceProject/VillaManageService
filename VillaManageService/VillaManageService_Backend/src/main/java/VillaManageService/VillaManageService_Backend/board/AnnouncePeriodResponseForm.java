package VillaManageService.VillaManageService_Backend.board;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class AnnouncePeriodResponseForm {
    private Long announceId;

    private String title;

    private LocalDate dateStart;

    private LocalDate dateEnd;

    // Survey의 정보를 받아 SurveyResponseDto 생성
    public AnnouncePeriodResponseForm(Announce announce) {
        this.announceId = announce.getAnnounceId();
        this.title = announce.getTitle();
        this.dateStart = announce.getDateStart();
        this.dateEnd = announce.getDateEnd();
    }
}
