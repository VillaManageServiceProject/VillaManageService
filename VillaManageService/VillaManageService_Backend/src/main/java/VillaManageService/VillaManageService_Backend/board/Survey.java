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
public class Survey extends Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long surveyId;

//    Post 상속 필요
//    private String publisherId;
//    private String address;
//    private String title;

    private Date dateStart;

    private Date dateEnd;

    private String options;

    // requestDto 정보를 가져와서 entity 만들 때 사용
    public Survey(SurveyCreateForm surveyCreateForm, String publisherId) {
        super(postCreateForm, publisherId)
        this.title = surveyCreateForm.getTitle();
        this.notification = surveyCreateForm.getNotification();
        this.content = surveyCreateForm.getContent();
        this.publisherId = publisherId;
        this.address = surveyCreateForm.getAddress();
    }

    // 업데이트 메소드
    public void update(SurveyCreateForm surveyCreateForm) {
        this.title = surveyCreateForm.getTitle();
        this.content = surveyCreateForm.getContent();
    }
}
