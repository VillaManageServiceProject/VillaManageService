package VillaManageService.VillaManageService_Backend.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityCenterRepository extends JpaRepository<CommunityCenter, String> {
//    Optional<CommunityCenter> findByusername(String id);
}
