package VillaManageService.VillaManageService_Backend.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommunityCenterService {

    private final CommunityCenterRepository communityCenterRepository;
    private final PasswordEncoder passwordEncoder;

    public CommunityCenter create(String id, String password, String name, String contact_number, String department,
                                  String center_address) {
        CommunityCenter communityCenter = new CommunityCenter();
        communityCenter.setId(id);
        communityCenter.setPassword(passwordEncoder.encode(password));
        communityCenter.setName(name);
        communityCenter.setContact_number(contact_number);
        communityCenter.setDepartment(department);
        communityCenter.setCenter_address(center_address);
        this.communityCenterRepository.save(communityCenter);
        return communityCenter;
    }

}
