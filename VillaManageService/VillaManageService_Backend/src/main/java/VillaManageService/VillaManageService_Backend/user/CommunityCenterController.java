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
public class CommunityCenterController {

    private final CommunityCenterService communityCenterService;

    @GetMapping("/communityCenter_signup")
    public ResponseEntity<String> signup(CommunityCenterCreateForm communityCenterCreateForm) {
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/communityCenter_signup")
    public ResponseEntity<String> signup(@Valid @RequestBody CommunityCenterCreateForm communityCenterCreateForm,
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

        if (!communityCenterCreateForm.getPassword1().equals(communityCenterCreateForm.getPassword2())) {
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
            communityCenterService.create(communityCenterCreateForm.getId(), communityCenterCreateForm.getPassword1(),
                    communityCenterCreateForm.getName(), communityCenterCreateForm.getContactNumber(),
                    communityCenterCreateForm.getDepartment(), communityCenterCreateForm.getCenterAddress());
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
}
