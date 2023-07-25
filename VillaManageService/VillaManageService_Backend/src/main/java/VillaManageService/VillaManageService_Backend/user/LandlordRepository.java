package VillaManageService.VillaManageService_Backend.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LandlordRepository extends JpaRepository<Landlord, String> {
//    Optional<Landlord> findByusername(String id);
}
