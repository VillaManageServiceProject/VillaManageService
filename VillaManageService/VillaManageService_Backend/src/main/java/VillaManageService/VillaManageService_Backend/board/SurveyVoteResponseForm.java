package VillaManageService.VillaManageService_Backend.board;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@NoArgsConstructor
@Getter
public class SurveyVoteResponseForm {
    private Long surveyId;

    private String title;

    private String question;

    private ArrayList<Map<String, Object>> options;

    // Survey의 정보를 받아 SurveyResponseDto 생성
    public SurveyVoteResponseForm(Survey survey) {
        this.surveyId = survey.getSurveyId();
        this.title = survey.getTitle();
        this.question = survey.getQuestion();
        this.options = survey.getOptions();
    }
}