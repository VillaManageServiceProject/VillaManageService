package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.user.MemberRole;
import jakarta.data.repository.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnnounceRepository extends JpaRepository<Announce, Long> {
    Announce findByAnnounceId(Long generalId);
    //    Announce findByAddress(String address);
//    Announce findByTitle(String title);
//    Announce findByContent(String content);

    List<Announce> findByVillaIdOrderByModifiedAtDesc(String villaId);

    @Query("SELECT g FROM Announce g JOIN g.publisher p JOIN p.roles r WHERE r = 'ADMIN'")
    List<Announce> findAnnouncesWherePublisherHasAdminRole();
    @Query("SELECT g FROM Announce g JOIN g.publisher p WHERE g.villaId = :villaId AND :role MEMBER OF p.roles")
    List<Announce> findAnnouncesByVillaIdAndPublisherHasRole(@Param("villaId") String villaId, @Param("role") MemberRole role);

    @Query("SELECT g FROM Announce g JOIN g.publisher p WHERE g.villaId = :villaId AND g.noticeType = :noticeType AND :role MEMBER OF p.roles")
    List<Announce> findAnnouncesByVillaIdAndNoticeTypeAndPublisherHasRole(@Param("villaId") String villaId, @Param("noticeType") String noticeType, @Param("role") MemberRole role);
}
