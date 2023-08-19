package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.util.ListMapConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Survey extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long surveyId;

    private String postType;

    private String publisherId;

    private String villaId;

    private String title;

    private LocalDate dateStart;

    private LocalDate dateEnd;

    private String question;

    @Convert(converter = ListMapConverter.class)
    private ArrayList<Map<String, Object>> options;

    // requestDto 정보를 가져와서 entity 만들 때 사용
    public Survey(SurveyCreateForm surveyCreateForm, String publisherId) {
        this.publisherId = publisherId;
        this.villaId = surveyCreateForm.getVillaId();
        this.title = surveyCreateForm.getTitle();
        this.dateStart = surveyCreateForm.getDateStart();
        this.dateEnd = surveyCreateForm.getDateEnd();
        this.question = surveyCreateForm.getQuestion();
        this.options = surveyCreateForm.getOptions();
    }

    // 업데이트 메소드
    public void updateSurvey(SurveyCreateForm surveyCreateForm) {
        this.title = surveyCreateForm.getTitle();
        this.question = surveyCreateForm.getQuestion();
    }

    public void updateVoteCnt(int optionIdx) {
        ArrayList<Map<String, Object>> optionData = this.getOptions();

        if (optionData != null && optionData.size() > optionIdx) {
            Map<String, Object> option = optionData.get(optionIdx);
            if (option.containsKey("voteCnt")) {
                int currentCount = (int) option.get("voteCnt");
                option.put("voteCnt", currentCount + 1);
            } else {
                option.put("voteCnt", 1);
            }
        }

        this.setOptions(optionData);
    }
}
