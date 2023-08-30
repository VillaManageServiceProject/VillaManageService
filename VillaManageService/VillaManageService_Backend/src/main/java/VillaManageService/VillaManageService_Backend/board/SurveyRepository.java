package VillaManageService.VillaManageService_Backend.board;

import jakarta.data.repository.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
    Survey findBySurveyId(Long surveyId);
//    Survey findByAddress(String address);
    Survey findByTitle(String title);
//    Survey findByContent(String content);
//    List<SurveyListResponseForm> findAllByOrderByModifiedAtDesc();

    List<Survey> findByVillaIdOrderByModifiedAtDesc(String villaId);
    List<Survey> findByVillaIdAndDateStartLessThanEqualAndDateEndGreaterThanEqualOrderByCreatedAtDesc(String villaId, LocalDate startDate, LocalDate endDate);
    @Query("SELECT sv FROM Survey sv WHERE sv.villaId = :villaId AND (sv.dateEnd < :today OR sv.dateStart > :today) ORDER BY sv.createdAt DESC")
    List<Survey> findSurveysOutsideDateRange(@Param("villaId") String villaId, @Param("today") LocalDate today);
}
