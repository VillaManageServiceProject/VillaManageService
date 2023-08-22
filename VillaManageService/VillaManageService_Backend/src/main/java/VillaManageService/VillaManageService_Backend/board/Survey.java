package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.user.Member;
import VillaManageService.VillaManageService_Backend.util.ListMapConverter;
import VillaManageService.VillaManageService_Backend.villa.Villa;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Survey extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_id", unique = true)
    private long surveyId;

    private String postType;

    private String publisherId;

    private String villaId;

    private String title;

    private LocalDate dateStart;

    private LocalDate dateEnd;

    private String question;

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "survey")
//    private VoteOption voteOption;

    @Convert(converter = ListMapConverter.class)
    private ArrayList<Map<String, Object>> options;

//    @ManyToOne
//    @JoinColumn(name = "villa_id", insertable = false, updatable = false)
//    private Villa villa;

    // requestDto 정보를 가져와서 entity 만들 때 사용
    public Survey(SurveyCreateForm surveyCreateForm, String publisherId, Villa villa) {
        this.publisherId = publisherId;
//        this.villa = villa;
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
        this.dateStart = surveyCreateForm.getDateStart();
        this.dateEnd = surveyCreateForm.getDateEnd();
        this.options = surveyCreateForm.getOptions();
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

    public void updateVoteMember(int optionIdx, String voteMemberId) {
        ArrayList<Map<String, Object>> optionData = this.getOptions();

        if (optionData != null && optionData.size() > optionIdx) {
            Map<String, Object> option = optionData.get(optionIdx);
            if (option.containsKey("voters")) {
                String voters = (String) option.get("voters");
                if(voters.equals("")) option.put("voters", voteMemberId);
                else option.put("voters", voters + ',' + voteMemberId);
            } else {
                option.put("voters", voteMemberId);
            }
        }

        this.setOptions(optionData);
    }
}



