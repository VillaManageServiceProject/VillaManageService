package VillaManageService.VillaManageService_Backend.building;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseRepository extends JpaRepository<House, String> {
//    Optional<House> findById(String id);
}
