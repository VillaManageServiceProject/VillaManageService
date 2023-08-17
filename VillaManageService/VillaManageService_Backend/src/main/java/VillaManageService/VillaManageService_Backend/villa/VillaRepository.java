package VillaManageService.VillaManageService_Backend.villa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VillaRepository extends JpaRepository<Villa, String> {
    Optional<Villa> findById(String id);
}
