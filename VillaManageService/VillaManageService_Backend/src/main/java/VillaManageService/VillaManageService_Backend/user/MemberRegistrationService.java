package VillaManageService.VillaManageService_Backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class MemberRegistrationService {

    private final ResidentRepository residentRepository;

    private final LandlordRepository landlordRepository;

    private final BuildingManagerRepository buildingManagerRepository;

    private final CommunityCenterRepository communityCenterRepository;

    private final PasswordEncoder passwordEncoder;

    public BuildingManager createBuildingManager(String id, String password, String name, String contactNumber, String department,
                                                 String manageAddress) {
        BuildingManager buildingManager = new BuildingManager();
        buildingManager.setId(id);
        buildingManager.setPassword(passwordEncoder.encode(password));
        buildingManager.setName(name);
        buildingManager.setContactNumber(contactNumber);
        buildingManager.setDepartment(department);
        buildingManager.setManageAddress(manageAddress);
        buildingManager.setRoles(Set.of(MemberRole.BUILDING_MANAGER));
        this.buildingManagerRepository.save(buildingManager);
        return buildingManager;
    }

    public CommunityCenter createCommunityCenter(String id, String password, String name, String contactNumber, String department,
                                                 String centerAddress) {
        CommunityCenter communityCenter = new CommunityCenter();
        communityCenter.setId(id);
        communityCenter.setPassword(passwordEncoder.encode(password));
        communityCenter.setName(name);
        communityCenter.setContactNumber(contactNumber);
        communityCenter.setDepartment(department);
        communityCenter.setCenterAddress(centerAddress);
        communityCenter.setRoles(Set.of(MemberRole.COMMUNITY_CENTER));
        this.communityCenterRepository.save(communityCenter);
        return communityCenter;
    }

    public Landlord createLandlord(String id, String password, String name, String email, int gender, String contactNumber,
                                   String contactNumberSub, Date birth, String ownedAddress, int ownedAddressDetail,
                                   String coOwnerId) {
        Landlord landlord = new Landlord();
        landlord.setId(id);
        landlord.setPassword(passwordEncoder.encode(password));
        landlord.setName(name);
        landlord.setEmail(email);
        landlord.setGender(gender);
        landlord.setContactNumber(contactNumber);
        landlord.setContactNumberSub(contactNumberSub);
        landlord.setBirth(birth);
        landlord.setOwnedAddress(ownedAddress);
        landlord.setOwnedAddressDetail(ownedAddressDetail);
        landlord.setCoOwnerId(coOwnerId);
        landlord.setRoles(Set.of(MemberRole.LANDLORD));
        this.landlordRepository.save(landlord);
        return landlord;
    }

    public Resident createResident(String id, String password, String name, String address, int addressDetail, String email,
                                   int gender, String contactNumber, String contactNumberSub, Date birth,
                                   String relationHousehold, Boolean isContractor, Boolean isMaster, Boolean isOwner) {
        Resident resident = new Resident();
        resident.setId(id);
        resident.setPassword(passwordEncoder.encode(password));
        resident.setName(name);
        resident.setAddress(address);
        resident.setAddressDetail(addressDetail);
        resident.setEmail(email);
        resident.setGender(gender);
        resident.setContactNumber(contactNumber);
        resident.setContactNumberSub(contactNumberSub);
        resident.setBirth(birth);
        resident.setRelationHousehold(relationHousehold);
        resident.setIsContractor(isContractor);
        resident.setIsMaster(isMaster);
        resident.setIsOwner(isOwner);
        resident.setRoles(Set.of(MemberRole.RESIDENT));
        this.residentRepository.save(resident);
        return resident;
    }

}
