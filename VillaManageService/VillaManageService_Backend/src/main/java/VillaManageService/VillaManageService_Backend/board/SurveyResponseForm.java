package VillaManageService.VillaManageService_Backend.board;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class SurveyResponseForm {
    private Long surveyId;

    private String title;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    // Survey의 정보를 받아 SurveyResponseDto 생성
    public SurveyResponseForm(Survey survey) {
        this.surveyId = survey.getSurveyId();
        this.title = survey.getTitle();
        this.content = survey.getContent();
        this.createdAt = survey.getCreatedAt();
        this.modifiedAt = survey.getModifiedAt();
    }
}
