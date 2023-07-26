package VillaManageService.VillaManageService_Backend.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.Date;

@RequiredArgsConstructor
@Service
public class ResidentService {

    private final ResidentRepository residentRepository;
    private final PasswordEncoder passwordEncoder;

    public Resident create(String id, String password, String name, String address, int addressDetail, String email,
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
        this.residentRepository.save(resident);
        return resident;
    }

}
