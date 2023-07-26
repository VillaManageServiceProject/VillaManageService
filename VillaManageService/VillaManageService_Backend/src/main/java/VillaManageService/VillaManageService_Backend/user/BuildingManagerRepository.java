package VillaManageService.VillaManageService_Backend.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingManagerRepository extends JpaRepository<BuildingManager, String> {
//    Optional<BuildingManager> findByid(String id);
}
