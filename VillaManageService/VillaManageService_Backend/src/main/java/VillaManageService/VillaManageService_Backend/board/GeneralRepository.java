package VillaManageService.VillaManageService_Backend.board;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GeneralRepository extends JpaRepository<General, Long> {
    General findByGeneralId(Long generalId);
//    General findByAddress(String address);
//    General findByTitle(String title);
//    General findByContent(String content);
//    List<GeneralListResponseForm> findAllByOrderByModifiedAtDesc();
}
