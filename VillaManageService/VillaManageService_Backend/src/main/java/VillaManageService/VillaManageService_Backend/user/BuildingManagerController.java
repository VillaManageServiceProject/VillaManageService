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
public class BuildingManagerController {

    private final BuildingManagerService buildingManagerService;

    @GetMapping("/buildingManager_signup")
    public String signup(BuildingManagerCreateForm buildingManagerCreateForm) {
        return "buildingManager_signup_form";
    }

    @PostMapping("/buildingManager_signup")
    public String signup(@Valid BuildingManagerCreateForm buildingManagerCreateForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "buildingManager_signup_form";
        }

        if (!buildingManagerCreateForm.getPassword1().equals(buildingManagerCreateForm.getPassword2())) {
            bindingResult.rejectValue("password2", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");
            return "buildingManager_signup_form";
        }

        try {
            buildingManagerService.create(buildingManagerCreateForm.getId(), buildingManagerCreateForm.getPassword1(),
                    buildingManagerCreateForm.getName(), buildingManagerCreateForm.getContact_number(),
                    buildingManagerCreateForm.getDepartment(), buildingManagerCreateForm.getAddress());
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", "이미 등록된 사용자입니다.");
            return "buildingManager_signup_form";
        } catch (Exception e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", e.getMessage());
            return "buildingManager_signup_form";
        }

        return "redirect:/user/buildingManager_signup";
    }

//    @GetMapping("/buildingManager_login")
//    public String login() {
//        return "login_form";
//    }
}
