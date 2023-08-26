package VillaManageService.VillaManageService_Backend.board;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class SurveyPeriodResponseForm {
    private Long surveyId;

    private String title;

    private LocalDate dateStart;

    private LocalDate dateEnd;

    // Survey의 정보를 받아 SurveyResponseDto 생성
    public SurveyPeriodResponseForm(Survey survey) {
        this.surveyId = survey.getSurveyId();
        this.title = survey.getTitle();
        this.dateStart = survey.getDateStart();
        this.dateEnd = survey.getDateEnd();
    }
}
