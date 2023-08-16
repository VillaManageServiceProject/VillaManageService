package VillaManageService.VillaManageService_Backend.board;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
    Survey findBySurveyId(Long SurveyId);
    Survey findByAddress(String address);
    Survey findByTitle(String title);
    Survey findByContent(String content);
    List<SurveyListResponseForm> findAllByOrderByModifiedAtDesc();
}
