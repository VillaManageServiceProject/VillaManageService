package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.user.MemberRole;
import jakarta.data.repository.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GeneralRepository extends JpaRepository<General, Long> {
    General findByGeneralId(Long generalId);
//    General findByAddress(String address);
//    General findByTitle(String title);
//    General findByContent(String content);
    List<General> findByVillaIdOrderByModifiedAtDesc(String villaId);

    @Query("SELECT g FROM General g JOIN g.publisher p JOIN p.roles r WHERE r = 'ADMIN'")
    List<General> findGeneralsWherePublisherHasAdminRole();
    @Query("SELECT g FROM General g JOIN g.publisher p WHERE g.villaId = :villaId AND :role MEMBER OF p.roles")
    List<General> findGeneralsByVillaIdAndPublisherHasRole(@Param("villaId") String villaId, @Param("role") MemberRole role);

    @Query("SELECT g FROM General g JOIN g.publisher p WHERE g.villaId = :villaId AND g.noticeType = :noticeType AND :role MEMBER OF p.roles")
    List<General> findGeneralsByVillaIdAndNoticeTypeAndPublisherHasRole(@Param("villaId") String villaId, @Param("noticeType") String noticeType, @Param("role") MemberRole role);
}
