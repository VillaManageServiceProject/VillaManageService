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
public class CommunityCenterController {

    private final CommunityCenterService communityCenterService;

    @GetMapping("/communityCenter_signup")
    public String signup(CommunityCenterCreateForm communityCenterCreateForm) {
        return "communityCenter_signup_form";
    }

    @PostMapping("/communityCenter_signup")
    public String signup(@Valid CommunityCenterCreateForm communityCenterCreateForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "communityCenter_signup_form";
        }

        if (!communityCenterCreateForm.getPassword1().equals(communityCenterCreateForm.getPassword2())) {
            bindingResult.rejectValue("password2", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");
            return "communityCenter_signup_form";
        }

        try {
            communityCenterService.create(communityCenterCreateForm.getId(), communityCenterCreateForm.getPassword1(),
                    communityCenterCreateForm.getName(), communityCenterCreateForm.getContact_number(),
                    communityCenterCreateForm.getDepartment(), communityCenterCreateForm.getCenter_address());
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", "이미 등록된 사용자입니다.");
            return "communityCenter_signup_form";
        } catch (Exception e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", e.getMessage());
            return "communityCenter_signup_form";
        }

        return "redirect:/user/communityCenter_signup";
    }
}
