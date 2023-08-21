package VillaManageService.VillaManageService_Backend.board;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class SurveyController {
    private final SurveyService surveyService;

//    public PostController(PostService postService) {
//        this.postService = postService;
//    }

    // 글 등록
    @PostMapping("/surveys")
    public SurveyResponseForm createSurvey(@RequestBody SurveyCreateForm surveyCreateForm) {
        SurveyResponseForm survey = surveyService.createSurvey(surveyCreateForm);
        return survey;
    }

    @GetMapping("/surveys/board")
    public List<SurveyListResponseForm> getSurveys(@RequestParam String villaId, @RequestParam String available) {
        return surveyService.readSurveyByExpired(villaId, available);
    }

    // 전체 목록 조회
//    @GetMapping("/surveys/board")
//    public List<SurveyListResponseForm> getAllSurveys() {
//        return surveyService.findAllSurvey();
//    }

    // 글 하나 조회
    @GetMapping("/surveys/{surveyId}")
    public SurveyResponseForm getOneSurvey(@PathVariable Long surveyId) {
        return surveyService.findOneSurvey(surveyId);
    }

    // 글 수정
    @PutMapping("/surveys")
    public SurveyResponseForm updateSurveyVote(@RequestParam Long surveyId, @RequestParam int optionIdx) {
        surveyService.updateSurveyVote(surveyId, optionIdx);
        return surveyService.findOneSurvey(surveyId);
    }

    @PutMapping("/surveys/{surveyId}")
    public Long updateSurvey(@PathVariable Long surveyId, @RequestBody SurveyCreateForm surveyCreateForm) {
        return surveyService.updateSurvey(surveyId, surveyCreateForm);
    }

    // 글 삭제
    @DeleteMapping("/surveys/{surveyId}")
    public Long deleteSurvey(@PathVariable Long surveyId) {
        return surveyService.deleteSurvey(surveyId);
    }
}
