package VillaManageService.VillaManageService_Backend.user;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.validation.FieldError;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.dao.DataIntegrityViolationException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class BuildingManagerController {

    private final BuildingManagerService buildingManagerService;

    @GetMapping("/buildingManager_signup")
    public ResponseEntity<String> signup(BuildingManagerCreateForm buildingManagerCreateForm) {
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/buildingManager_signup")
    public ResponseEntity<String> signup(@Valid @RequestBody BuildingManagerCreateForm buildingManagerCreateForm,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Construct a meaningful error message
            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            // Loop through the field errors and append them to the error message
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            // Return the error message
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        if (!buildingManagerCreateForm.getPassword1().equals(buildingManagerCreateForm.getPassword2())) {
            bindingResult.rejectValue("password2", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");

            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            // Loop through the field errors and append them to the error message
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            // Return the error message
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        try {
            buildingManagerService.create(buildingManagerCreateForm.getId(), buildingManagerCreateForm.getPassword1(),
                    buildingManagerCreateForm.getName(), buildingManagerCreateForm.getContactNumber(),
                    buildingManagerCreateForm.getDepartment(), buildingManagerCreateForm.getManageAddress());
        } catch (DataIntegrityViolationException e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", "이미 등록된 사용자입니다.");
            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", e.getMessage());
            return ResponseEntity.ok("ok");
        }

        return ResponseEntity.ok("ok");
    }

//    @GetMapping("/buildingManager_login")
//    public String login() {
//        return "login_form";
//    }
}
