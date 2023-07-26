package VillaManageService.VillaManageService_Backend.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BuildingManagerService {

    private final BuildingManagerRepository buildingManagerRepository;
    private final PasswordEncoder passwordEncoder;

    public BuildingManager create(String id, String password, String name, String contactNumber, String department,
                                  String manageAddress) {
        BuildingManager buildingManager = new BuildingManager();
        buildingManager.setId(id);
        buildingManager.setPassword(passwordEncoder.encode(password));
        buildingManager.setName(name);
        buildingManager.setContactNumber(contactNumber);
        buildingManager.setDepartment(department);
        buildingManager.setManageAddress(manageAddress);
        this.buildingManagerRepository.save(buildingManager);
        return buildingManager;
    }

}
