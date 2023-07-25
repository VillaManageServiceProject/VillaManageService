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

    public Landlord create(String id, String password, String name, String contact_number, String email, int gender,
                           String contact_number_sub, Date birth, String owned_address, int owned_address_detail,
                           String co_owner_id) {
        Landlord landlord = new Landlord();
        landlord.setId(id);
        landlord.setPassword(passwordEncoder.encode(password));
        landlord.setName(name);
        landlord.setContact_number(contact_number);
        landlord.setEmail(email);
        landlord.setGender(gender);
        landlord.setContact_number_sub(contact_number_sub);
        landlord.setBirth(birth);
        landlord.setOwned_address(owned_address);
        landlord.setOwned_address_detail(owned_address_detail);
        landlord.setCo_owner_id(co_owner_id);
        this.landlordRepository.save(landlord);
        return landlord;
    }

}
