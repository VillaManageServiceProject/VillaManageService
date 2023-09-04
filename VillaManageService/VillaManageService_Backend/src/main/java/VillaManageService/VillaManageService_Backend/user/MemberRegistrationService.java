package VillaManageService.VillaManageService_Backend.user;

import VillaManageService.VillaManageService_Backend.board.Survey;
import VillaManageService.VillaManageService_Backend.board.SurveyCreateForm;
import VillaManageService.VillaManageService_Backend.building.*;
import VillaManageService.VillaManageService_Backend.util.OpenAPIService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MemberRegistrationService {

    private final ResidentRepository residentRepository;

    private final LandlordRepository landlordRepository;

    private final BuildingManagerRepository buildingManagerRepository;

    private final CommunityCenterRepository communityCenterRepository;

    private final MemberRepository memberRepository;

    private final VillaRepository villaRepository;

    private final HouseRepository houseRepository;

    private final PasswordEncoder passwordEncoder;

    private final OpenAPIService openAPIService;

    private final VillaService villaService;

    @PersistenceContext
    private EntityManager entityManager;

    public void create(MemberRequestForm requestForm) throws Exception {
        if (requestForm instanceof ResidentCreateForm) createResident((ResidentCreateForm) requestForm);
        else if (requestForm instanceof LandlordCreateForm) createLandlord((LandlordCreateForm) requestForm);
        else if (requestForm instanceof CommunityCenterCreateForm)
            createCommunityCenter((CommunityCenterCreateForm) requestForm);
        else if (requestForm instanceof BuildingManagerCreateForm)
            createBuildingManager((BuildingManagerCreateForm) requestForm);
    }

    public BuildingManager createBuildingManager(BuildingManagerCreateForm buildingManagerCreateForm) {
        Villa manageVilla = entityManager.getReference(Villa.class, buildingManagerCreateForm.getManageVillaId());

        BuildingManager buildingManager = new BuildingManager();
        buildingManager.setId(buildingManagerCreateForm.getId());
        buildingManager.setPassword(passwordEncoder.encode(buildingManagerCreateForm.getPassword1()));
        buildingManager.setName(buildingManagerCreateForm.getName());
        buildingManager.setContactNumber(buildingManagerCreateForm.getContactNumber());
        buildingManager.setDepartment(buildingManagerCreateForm.getDepartment());
        buildingManager.setManageVilla(manageVilla);
        buildingManager.setRoles(Set.of(MemberRole.BUILDING_MANAGER));
        this.buildingManagerRepository.save(buildingManager);
        return buildingManager;
    }

    public CommunityCenter createCommunityCenter(CommunityCenterCreateForm communityCenterCreateForm) throws Exception {
        CommunityCenter communityCenter = new CommunityCenter();
        communityCenter.setId(communityCenterCreateForm.getId());
        communityCenter.setPassword(passwordEncoder.encode(communityCenterCreateForm.getPassword1()));
        communityCenter.setName(communityCenterCreateForm.getName());
        communityCenter.setContactNumber(communityCenterCreateForm.getContactNumber());
        communityCenter.setCcId(communityCenterCreateForm.getCcId());
        communityCenter.setLocalCC(openAPIService.requestLocalCommunityCenterOfVilla(communityCenterCreateForm.getCenterAddress()));
        communityCenter.setDepartment(communityCenterCreateForm.getDepartment());
        communityCenter.setCenterAddress(communityCenterCreateForm.getCenterAddress());
        communityCenter.setRoles(Set.of(MemberRole.COMMUNITY_CENTER));
        this.communityCenterRepository.save(communityCenter);
        return communityCenter;
    }

    //    @Transactional
//    public Landlord createLandlord(String id, String password, String name, String email, int gender, String contactNumber,
//                                   String contactNumberSub, Date birth, House house,
//                                   String coOwnerId) {
    @Transactional
    public Landlord createLandlord(LandlordCreateForm landlordCreateForm) throws Exception {
//        House house = villaService.generateHouse(landlordCreateForm.getVillaId(), landlordCreateForm.getOwnedAddressDetail());
        Optional<House> h = this.houseRepository.findById(landlordCreateForm.getVillaId() + String.valueOf(landlordCreateForm.getOwnedAddressDetail()));
        if (h.isEmpty()) {
            House house = new House();
            house.setId(landlordCreateForm.getVillaId() + String.valueOf(landlordCreateForm.getOwnedAddressDetail()));
            house.setAddressDetail(landlordCreateForm.getOwnedAddressDetail());
            house = this.houseRepository.save(house);
            h = Optional.of(house);
        }
//        Villa villa = villaService.generateVilla(landlordCreateForm.getVillaId(), landlordCreateForm.getOwnedAddress(), house);
        Optional<Villa> v = this.villaRepository.findById(landlordCreateForm.getVillaId());
        if (v.isEmpty()) {
            String villaInfo = openAPIService.requestVillaInfo(landlordCreateForm.getVillaId());

            Villa villa = new Villa();
            villa.setId(landlordCreateForm.getVillaId());
            villa.setVillaInfo(villaInfo);
            villa.setAddress(landlordCreateForm.getOwnedAddress());
            villa.getHouses().add(h.get());
            villa.setLocalCC(openAPIService.requestLocalCommunityCenterOfVilla(landlordCreateForm.getOwnedAddress()));

            h.get().setVilla(villa);

            this.villaRepository.save(villa);
        } else {
            Villa villa = v.get();
            villa.getHouses().add(h.get());

            h.get().setVilla(villa);
        }

        Landlord landlord = new Landlord();
        landlord.setId(landlordCreateForm.getId());
        landlord.setPassword(passwordEncoder.encode(landlordCreateForm.getPassword1()));
        landlord.setName(landlordCreateForm.getName());
        landlord.setEmail(landlordCreateForm.getEmail());
        landlord.setGender(landlordCreateForm.getGender());
        landlord.setContactNumber(landlordCreateForm.getContactNumber());
        landlord.setContactNumberSub(landlordCreateForm.getContactNumberSub());
        landlord.setBirth(landlordCreateForm.getBirth());
        landlord.getHouses().add(h.get());
        landlord.setCoOwnerId(landlordCreateForm.getCoOwnerId());
        landlord.setRoles(Set.of(MemberRole.LANDLORD));
        h.get().setLandlord(landlord);
        landlord = this.landlordRepository.save(landlord);
        return landlord;
    }

    @Transactional
    public void setHouseLandlord(House house, Landlord landlord) {
        houseRepository.findById(house.getId()).get().setLandlord(landlord);
    }

    //    public Resident createResident(String id, String password, String name, House house, String email,
//                                   int gender, String contactNumber, String contactNumberSub, Date birth,
//                                   String relationHousehold, Boolean isContractor, Boolean isMaster, Boolean isOwner) {
    @Transactional
    public Resident createResident(ResidentCreateForm residentCreateForm) throws Exception {
        Optional<House> h = this.houseRepository.findById(residentCreateForm.getVillaId() + String.valueOf(residentCreateForm.getAddressDetail()));
        if (h.isEmpty()) {
            House house = new House();
            house.setId(residentCreateForm.getVillaId() + String.valueOf(residentCreateForm.getAddressDetail()));
            house.setAddressDetail(residentCreateForm.getAddressDetail());
            h = Optional.of(this.houseRepository.save(house));
        }
//        Villa villa = villaService.generateVilla(landlordCreateForm.getVillaId(), landlordCreateForm.getOwnedAddress(), house);
        Optional<Villa> v = this.villaRepository.findById(residentCreateForm.getVillaId());
        if (v.isEmpty()) {
            String villaInfo = openAPIService.requestVillaInfo(residentCreateForm.getVillaId());

            Villa villa = new Villa();
            villa.setId(residentCreateForm.getVillaId());
            villa.setVillaInfo(villaInfo);
            villa.setAddress(residentCreateForm.getAddress());
            villa.getHouses().add(h.get());
            villa.setLocalCC(openAPIService.requestLocalCommunityCenterOfVilla(residentCreateForm.getAddress()));

            h.get().setVilla(villa);

            this.villaRepository.save(villa);
        } else {
            Villa villa = v.get();
            villa.getHouses().add(h.get());

            h.get().setVilla(villa);
        }

        Resident resident = new Resident();
        resident.setId(residentCreateForm.getId());
        resident.setPassword(passwordEncoder.encode(residentCreateForm.getPassword1()));
        resident.setName(residentCreateForm.getName());
        resident.setHouse(h.get());
        resident.setEmail(residentCreateForm.getEmail());
        resident.setGender(residentCreateForm.getGender());
        resident.setContactNumber(residentCreateForm.getContactNumber());
        resident.setContactNumberSub(residentCreateForm.getContactNumberSub());
        resident.setBirth(residentCreateForm.getBirth());
        resident.setRelationHousehold(residentCreateForm.getRelationHousehold());
        resident.setIsContractor(residentCreateForm.getIsContractor());
        resident.setIsMaster(residentCreateForm.getIsMaster());
        resident.setIsOwner(residentCreateForm.getIsOwner());
        resident.setRoles(Set.of(MemberRole.RESIDENT));
        resident = this.residentRepository.save(resident);
        h.get().getResidents().add(resident);
        return resident;
    }

    @Transactional
    public void update(MemberRequestForm requestForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            String publisherId = authentication.getName();
            Member member = memberRepository.findById(publisherId).orElseThrow(
                    () -> new IllegalArgumentException("해당 사용자가 존재하지 않습니다.")
            );
            requestForm.setPassword1(passwordEncoder.encode(requestForm.getPassword1()));
            if (member instanceof Resident) ((Resident) member).updateMember(requestForm);
            else if (member instanceof Landlord) ((Landlord) member).updateMember(requestForm);
            else if (member instanceof CommunityCenter) ((CommunityCenter) member).updateMember(requestForm);
            else if (member instanceof BuildingManager) ((BuildingManager) member).updateMember(requestForm);
        }
    }
}
