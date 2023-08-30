package VillaManageService.VillaManageService_Backend.building;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Controller
@RequestMapping("/villa")
public class VillaController {
    private final VillaService villaService;

//    @PostMapping("/register")
//    public ResponseEntity<String> register(@Valid @RequestBody VillaCreateForm villaCreateForm,
//                                         BindingResult bindingResult) {
//        StringBuilder errorMessage = new StringBuilder("Validation failed. ");
//        try {
//            villaService.generateVilla(villaCreateForm.getVillaId(), villaCreateForm.getAddress());
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(errorMessage.toString());
//        }
//        return ResponseEntity.ok("ok");
//    }
//
    @GetMapping("/{villaId}")
    public ResponseEntity<Villa> getBrBasisOulnInfo(@PathVariable String villaId) {
        Villa villaInfo = villaService.getInfo(villaId);
        return ResponseEntity.ok(villaInfo);
    }
}
