//package VillaManageService.VillaManageService_Backend.user;
//
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import lombok.RequiredArgsConstructor;
//
//import java.util.Date;
//
//@RequiredArgsConstructor
//@Service
//public class ResidentService {
//
//    private final ResidentRepository residentRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public Resident create(String id, String password, String name, String address, int address_detail, String email,
//                           int gender, String contact_number_sub, Date birth, String relation_household,
//                           Boolean contractor, Boolean master, Boolean owner) {
//        Resident resident = new Resident();
//        resident.setId(id);
//        resident.setPassword(passwordEncoder.encode(password));
//        resident.setName(name);
//        resident.setAddress(address);
//        resident.setAddress_detail(address_detail);
//        resident.setEmail(email);
//        resident.setGender(gender);
//        resident.setContact_number_sub(contact_number_sub);
//        resident.setBirth(birth);
//        resident.setRelation_household(relation_household);
//        resident.setContractor(contractor);
//        resident.setMaster(master);
//        resident.setOwner(owner);
//        this.residentRepository.save(resident);
//        return resident;
//    }
//
//}
