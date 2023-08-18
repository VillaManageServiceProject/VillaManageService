package VillaManageService.VillaManageService_Backend.board;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@NoArgsConstructor
@Getter
public class SurveyResponseForm {
    private Long surveyId;

    private String publisherId;

    private String title;

    private String question;

    private ArrayList<Map<String, Object>> options;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private LocalDate dateStart;

    private LocalDate dateEnd;

    // Survey의 정보를 받아 SurveyResponseDto 생성
    public SurveyResponseForm(Survey survey) {
        this.surveyId = survey.getSurveyId();
        this.publisherId = survey.getPublisherId();
        this.title = survey.getTitle();
        this.question = survey.getQuestion();
        this.options = survey.getOptions();
        this.createdAt = survey.getCreatedAt();
        this.modifiedAt = survey.getModifiedAt();
        this.dateStart = survey.getDateStart();
        this.dateEnd = survey.getDateEnd();
    }
}
