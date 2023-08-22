package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.user.*;
import VillaManageService.VillaManageService_Backend.villa.Villa;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SurveyService {

    private final SurveyRepository surveyRepository;

    private final MemberRepository memberRepository;

    @PersistenceContext
    private EntityManager entityManager;

    // 글 생성
    public SurveyResponseForm createSurvey(SurveyCreateForm surveyCreateForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            String publisherId = authentication.getName();
//            Optional<Member> _member = memberRepository.findById(publisherId);
//            Member member = _member.get();
            Villa villaReference = entityManager.getReference(Villa.class, surveyCreateForm.getVillaId());
            Survey survey = new Survey(surveyCreateForm, publisherId, villaReference);
            surveyRepository.save(survey);
            return new SurveyResponseForm(survey);
        }
        return null;
    }

    // 모든 글 가져오기
    public List<SurveyListResponseForm> findAllSurvey() {
        try {
            List<Survey> SurveyList = surveyRepository.findAll();

            List<SurveyListResponseForm> responseFormList = new ArrayList<>();

            for (Survey Survey : SurveyList) {
                responseFormList.add(
                        new SurveyListResponseForm(Survey)
                );
            }
            return responseFormList;
        } catch (Exception e) {
//            throw new DBEmptyDataException("a");
        }
        return null;
    }

    public List<SurveyListResponseForm> readSurveyByExpired(String villaId, String available) {
        try {
            List<Survey> SurveyList;

            if(available.equals("valid")) SurveyList = surveyRepository.findByVillaIdAndDateStartLessThanEqualAndDateEndGreaterThanEqualOrderByCreatedAtDesc(villaId, LocalDate.now(), LocalDate.now());
            else {
                LocalDate today = LocalDate.now();
                SurveyList =surveyRepository.findSurveysOutsideDateRange(villaId, today);
            }

            List<SurveyListResponseForm> responseFormList = new ArrayList<>();

            for (Survey Survey : SurveyList) {
                responseFormList.add(
                        new SurveyListResponseForm(Survey)
                );
            }
            return responseFormList;
        } catch (Exception e) {
//            throw new DBEmptyDataException("a");
        }
        return null;
    }

    // 글 하나 가져오기

    public SurveyResponseForm findOneSurvey(Long surveyId) {
//        Post post = postRepository.findByPostId(postId).orElseThrow(
//                () -> new IllegalArgumentException("조회 실패")
//        );
        Survey survey = surveyRepository.findBySurveyId(surveyId);
        if (survey == null) {
            throw new IllegalArgumentException("조회 실패");
        }
        return new SurveyResponseForm(survey);
    }

    // 글 수정
    @Transactional
    public SurveyResponseForm updateSurveyVote(Long surveyId, int optionIdx) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            String publisherId = authentication.getName();
            Survey survey = surveyRepository.findById(surveyId).orElseThrow(
                    () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
            );
            survey.updateVoteCnt(optionIdx);
            survey.updateVoteMember(optionIdx, publisherId);
            return new SurveyResponseForm(survey);
        }
        return null;
    }

    @Transactional
    public Long updateSurvey(Long surveyId, SurveyCreateForm requestForm) {
        Survey survey = surveyRepository.findById(surveyId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
        );
        survey.updateSurvey(requestForm);
        return survey.getSurveyId();
    }

    // 삭제
    @Transactional
    public Long deleteSurvey(Long surveyId) {
        surveyRepository.deleteById(surveyId);
        return surveyId;
    }
}
