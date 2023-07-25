package VillaManageService.VillaManageService_Backend.user;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class ResidentController {

//    private final ResidentService residentService;

    @GetMapping("/resident_signup")
    public ResponseEntity<String> signup(ResidentCreateForm residentCreateForm) {
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/resident_signup")
    public ResponseEntity<String> signup(@RequestBody Resident resident) {
//        if (bindingResult.hasErrors()) {
//            return ResponseEntity.ok("ok");
//        }
//
//        if (!residentCreateForm.getPassword1().equals(residentCreateForm.getPassword2())) {
//            bindingResult.rejectValue("password2", "passwordInCorrect",
//                    "2개의 패스워드가 일치하지 않습니다.");
//            return ResponseEntity.ok("ok");
//        }
//
//        try {
//            residentService.create(residentCreateForm.getId(), residentCreateForm.getPassword1(),
//                    residentCreateForm.getName(), residentCreateForm.getAddress(),
//                    residentCreateForm.getAddress_detail(), residentCreateForm.getEmail(),
//                    residentCreateForm.getGender(), residentCreateForm.getContact_number_sub(),
//                    residentCreateForm.getBirth(), residentCreateForm.getRelation_household(),
//                    residentCreateForm.getContractor(), residentCreateForm.getMaster(), residentCreateForm.getOwner());
//        } catch (DataIntegrityViolationException e) {
//            e.printStackTrace();
//            bindingResult.reject("signupFailed", "이미 등록된 사용자입니다.");
//            return ResponseEntity.ok("ok");
//        } catch (Exception e) {
//            e.printStackTrace();
//            bindingResult.reject("signupFailed", e.getMessage());
//            return ResponseEntity.ok("ok");
//        }

        return ResponseEntity.ok("ok");
    }
}
