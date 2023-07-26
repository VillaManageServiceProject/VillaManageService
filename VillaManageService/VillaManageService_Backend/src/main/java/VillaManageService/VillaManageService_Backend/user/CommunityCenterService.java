package VillaManageService.VillaManageService_Backend.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommunityCenterService {

    private final CommunityCenterRepository communityCenterRepository;
    private final PasswordEncoder passwordEncoder;

    public CommunityCenter create(String id, String password, String name, String contactNumber, String department,
                                  String centerAddress) {
        CommunityCenter communityCenter = new CommunityCenter();
        communityCenter.setId(id);
        communityCenter.setPassword(passwordEncoder.encode(password));
        communityCenter.setName(name);
        communityCenter.setContactNumber(contactNumber);
        communityCenter.setDepartment(department);
        communityCenter.setCenterAddress(centerAddress);
        this.communityCenterRepository.save(communityCenter);
        return communityCenter;
    }

}
