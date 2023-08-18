package VillaManageService.VillaManageService_Backend.board;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Survey extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long surveyId;

    private boolean isFinished;

    private String postType;

    private String publisherId;

    private String address;

    private String title;

    private Date dateStart;

    private Date dateEnd;

    private String question;

    private String options;

    // requestDto 정보를 가져와서 entity 만들 때 사용
    public Survey(SurveyCreateForm surveyCreateForm, String publisherId) {
        this.publisherId = publisherId;
        this.address = surveyCreateForm.getAddress();
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
}
