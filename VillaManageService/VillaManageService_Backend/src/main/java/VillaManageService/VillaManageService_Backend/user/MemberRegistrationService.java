package VillaManageService.VillaManageService_Backend.user;

import VillaManageService.VillaManageService_Backend.building.*;
import VillaManageService.VillaManageService_Backend.util.OpenAPIService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class MemberRegistrationService {

    private final ResidentRepository residentRepository;

    private final LandlordRepository landlordRepository;

    private final BuildingManagerRepository buildingManagerRepository;

    private final CommunityCenterRepository communityCenterRepository;

    private final VillaRepository villaRepository;

    private final HouseRepository houseRepository;

    private final PasswordEncoder passwordEncoder;

    private final OpenAPIService openAPIService;

    private final VillaService villaService;

    @PersistenceContext
    private EntityManager entityManager;

    public BuildingManager createBuildingManager(String id, String password, String name, String contactNumber, String department,
                                                 String manageVillaId) {
        Villa manageVilla = entityManager.getReference(Villa.class, manageVillaId);

        BuildingManager buildingManager = new BuildingManager();
        buildingManager.setId(id);
        buildingManager.setPassword(passwordEncoder.encode(password));
        buildingManager.setName(name);
        buildingManager.setContactNumber(contactNumber);
        buildingManager.setDepartment(department);
        buildingManager.setManageVilla(manageVilla);
        buildingManager.setRoles(Set.of(MemberRole.BUILDING_MANAGER));
        this.buildingManagerRepository.save(buildingManager);
        return buildingManager;
    }

    public CommunityCenter createCommunityCenter(String id, String password, String name, String contactNumber, String ccId, String department,
                                                 String centerAddress) throws Exception {
        CommunityCenter communityCenter = new CommunityCenter();
        communityCenter.setId(id);
        communityCenter.setPassword(passwordEncoder.encode(password));
        communityCenter.setName(name);
        communityCenter.setContactNumber(contactNumber);
        communityCenter.setCcId(ccId);
        communityCenter.setLocalCC(openAPIService.requestLocalCommunityCenterOfVilla(centerAddress));
        communityCenter.setDepartment(department);
        communityCenter.setCenterAddress(centerAddress);
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
        if(h.isEmpty()) {
            House house = new House();
            house.setId(landlordCreateForm.getVillaId() + String.valueOf(landlordCreateForm.getOwnedAddressDetail()));
            house.setAddressDetail(landlordCreateForm.getOwnedAddressDetail());
//            house.setVilla(villa);
            this.houseRepository.save(house);
            h = this.houseRepository.findById(landlordCreateForm.getVillaId() + String.valueOf(landlordCreateForm.getOwnedAddressDetail()));
        }
//        Villa villa = villaService.generateVilla(landlordCreateForm.getVillaId(), landlordCreateForm.getOwnedAddress(), house);
        Optional<Villa> v = this.villaRepository.findById(landlordCreateForm.getVillaId());
        if(v.isEmpty()) {
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
        this.landlordRepository.save(landlord);
        return landlord;
    }

    @Transactional
    public void setHouseLandlord(House house, Landlord landlord){
        houseRepository.findById(house.getId()).get().setLandlord(landlord);
    }

//    public Resident createResident(String id, String password, String name, House house, String email,
//                                   int gender, String contactNumber, String contactNumberSub, Date birth,
//                                   String relationHousehold, Boolean isContractor, Boolean isMaster, Boolean isOwner) {
    @Transactional
    public Resident createResident(ResidentCreateForm residentCreateForm) throws Exception {
        Optional<House> h = this.houseRepository.findById(residentCreateForm.getVillaId() + String.valueOf(residentCreateForm.getAddressDetail()));
        if(h.isEmpty()) {
            House house = new House();
            house.setId(residentCreateForm.getVillaId() + String.valueOf(residentCreateForm.getAddressDetail()));
            house.setAddressDetail(residentCreateForm.getAddressDetail());
//            house.setVilla(villa);
            this.houseRepository.save(house);
//            h = this.houseRepository.findById(residentCreateForm.getVillaId() + String.valueOf(residentCreateForm.getAddressDetail()));
            h = Optional.of(house);
        }
//        Villa villa = villaService.generateVilla(landlordCreateForm.getVillaId(), landlordCreateForm.getOwnedAddress(), house);
        Optional<Villa> v = this.villaRepository.findById(residentCreateForm.getVillaId());
        if(v.isEmpty()) {
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
        h.get().getResidents().add(resident);
        this.residentRepository.save(resident);
        return resident;
    }

}
