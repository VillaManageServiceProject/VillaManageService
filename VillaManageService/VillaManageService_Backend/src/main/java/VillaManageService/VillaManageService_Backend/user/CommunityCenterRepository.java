package VillaManageService.VillaManageService_Backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommunityCenterRepository extends JpaRepository<CommunityCenter, String> {
    Optional<CommunityCenter> findByLocalCC(String localCC);
}
