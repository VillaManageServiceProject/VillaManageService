package VillaManageService.VillaManageService_Backend.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.Date;

@RequiredArgsConstructor
@Service
public class LandlordService {

    private final LandlordRepository landlordRepository;
    private final PasswordEncoder passwordEncoder;

    public Landlord create(String id, String password, String name, String email, int gender, String contactNumber,
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
        this.landlordRepository.save(landlord);
        return landlord;
    }

}
