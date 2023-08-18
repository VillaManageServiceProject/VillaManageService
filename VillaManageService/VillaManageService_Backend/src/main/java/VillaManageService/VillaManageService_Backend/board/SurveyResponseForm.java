package VillaManageService.VillaManageService_Backend.board;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class SurveyResponseForm {
    private Long surveyId;

    private String title;

    private String question;

    private String options;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    // Survey의 정보를 받아 SurveyResponseDto 생성
    public SurveyResponseForm(Survey survey) {
        this.surveyId = survey.getSurveyId();
        this.title = survey.getTitle();
        this.question = survey.getQuestion();
        this.options = survey.getOptions();
        this.createdAt = survey.getCreatedAt();
        this.modifiedAt = survey.getModifiedAt();
    }
}
