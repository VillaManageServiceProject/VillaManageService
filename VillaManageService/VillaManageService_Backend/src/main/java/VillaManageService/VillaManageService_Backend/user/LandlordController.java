package VillaManageService.VillaManageService_Backend.user;

import jakarta.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.dao.DataIntegrityViolationException;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class LandlordController {

    private final LandlordService landlordService;

    @GetMapping("/landlord_signup")
    public String signup(LandlordCreateForm landlordCreateForm) {
        return "landlord_signup_form";
    }

    @PostMapping("/landlord_signup")
    public String signup(@Valid LandlordCreateForm landlordCreateForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "landlord_signup_form";
        }

        if (!landlordCreateForm.getPassword1().equals(landlordCreateForm.getPassword2())) {
            bindingResult.rejectValue("password2", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");
            return "landlord_signup_form";
        }

        try {
            landlordService.create(landlordCreateForm.getId(), landlordCreateForm.getPassword1(),
                    landlordCreateForm.getName(), landlordCreateForm.getContact_number(),
                    landlordCreateForm.getEmail(), landlordCreateForm.getGender(),
                    landlordCreateForm.getContact_number_sub(), landlordCreateForm.getBirth(),
                    landlordCreateForm.getOwned_address(), landlordCreateForm.getOwned_address_detail(),
                    landlordCreateForm.getCo_owner_id());
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", "이미 등록된 사용자입니다.");
            return "landlord_signup_form";
        } catch (Exception e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", e.getMessage());
            return "landlord_signup_form";
        }

        return "redirect:/user/landlord_signup";
    }
}
