package VillaManageService.VillaManageService_Backend.user;

import VillaManageService.VillaManageService_Backend.building.House;
import VillaManageService.VillaManageService_Backend.building.Villa;
import VillaManageService.VillaManageService_Backend.building.VillaService;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.validation.FieldError;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.dao.DataIntegrityViolationException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/user")
public class MemberRegistrationController {

    private final MemberRegistrationService memberRegistrationService;

    private final VillaService villaService;

    @PostMapping("/signup/buildingManager")
    public ResponseEntity<String> signup(@Valid @RequestBody BuildingManagerCreateForm buildingManagerCreateForm,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        if (!buildingManagerCreateForm.getPassword1().equals(buildingManagerCreateForm.getPassword2())) {
            bindingResult.rejectValue("password2", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");

            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        try {
            memberRegistrationService.createBuildingManager(buildingManagerCreateForm.getId(), buildingManagerCreateForm.getPassword1(),
                    buildingManagerCreateForm.getName(), buildingManagerCreateForm.getContactNumber(),
                    buildingManagerCreateForm.getDepartment(), buildingManagerCreateForm.getManageVillaId());
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

    @PostMapping("/signup/communityCenter")
    public ResponseEntity<String> signup(@Valid @RequestBody CommunityCenterCreateForm communityCenterCreateForm,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        if (!communityCenterCreateForm.getPassword1().equals(communityCenterCreateForm.getPassword2())) {
            bindingResult.rejectValue("password2", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");

            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        try {
            memberRegistrationService.createCommunityCenter(communityCenterCreateForm.getId(), communityCenterCreateForm.getPassword1(),
                    communityCenterCreateForm.getName(), communityCenterCreateForm.getContactNumber(),communityCenterCreateForm.getCcId(),
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

    @PostMapping("/signup/landlord")
    public ResponseEntity<String> signup(@Valid @RequestBody LandlordCreateForm landlordCreateForm,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        if (!landlordCreateForm.getPassword1().equals(landlordCreateForm.getPassword2())) {
            bindingResult.rejectValue("password2", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");

            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        try {
//            House house = villaService.generateHouse(landlordCreateForm.getVillaId(), landlordCreateForm.getOwnedAddressDetail());
//            Villa villa = villaService.generateVilla(landlordCreateForm.getVillaId(), landlordCreateForm.getOwnedAddress(), house);

//            Landlord landlord = memberRegistrationService.createLandlord(landlordCreateForm.getId(), landlordCreateForm.getPassword1(),
//                    landlordCreateForm.getName(), landlordCreateForm.getEmail(), landlordCreateForm.getGender(),
//                    landlordCreateForm.getContactNumber(), landlordCreateForm.getContactNumberSub(),
//                    landlordCreateForm.getBirth(), house, landlordCreateForm.getCoOwnerId());

            Landlord landlord = memberRegistrationService.createLandlord(landlordCreateForm);

//            memberRegistrationService.setHouseLandlord(house, landlord);
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

    @PostMapping("/signup/resident")
    public ResponseEntity<String> signup(@Valid @RequestBody ResidentCreateForm residentCreateForm,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        if (!residentCreateForm.getPassword1().equals(residentCreateForm.getPassword2())) {
            bindingResult.rejectValue("password2", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");

            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        try {
//            House house = villaService.generateHouse(residentCreateForm.getVillaId(), residentCreateForm.getAddressDetail());
//            villaService.generateVilla(residentCreateForm.getVillaId(), residentCreateForm.getAddress(), house);
//
//            memberRegistrationService.createResident(residentCreateForm.getId(), residentCreateForm.getPassword1(),
//                    residentCreateForm.getName(), house, residentCreateForm.getEmail(),
//                    residentCreateForm.getGender(), residentCreateForm.getContactNumber(),
//                    residentCreateForm.getContactNumberSub(), residentCreateForm.getBirth(),
//                    residentCreateForm.getRelationHousehold(), residentCreateForm.getIsContractor(),
//                    residentCreateForm.getIsMaster(), residentCreateForm.getIsOwner());

            Resident resident = memberRegistrationService.createResident(residentCreateForm);
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
