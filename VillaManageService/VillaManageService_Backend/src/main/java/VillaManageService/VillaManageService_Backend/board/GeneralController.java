package VillaManageService.VillaManageService_Backend.board;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class GeneralController {
    private final GeneralService generalService;

//    public PostController(PostService postService) {
//        this.postService = postService;
//    }

    // 글 등록
    @PostMapping("/generals")
    public GeneralResponseForm createGeneral(@RequestBody GeneralCreateForm generalCreateForm) {
        GeneralResponseForm general = generalService.createGeneral(generalCreateForm);
        return general;
    }

    // 전체 목록 조회
    @GetMapping("/generals/board/{villaId}")
    public List<GeneralListResponseForm> getAllGenerals(@PathVariable String villaId) {
        return generalService.findAllGeneral(villaId);
    }

    // 글 하나 조회
    @GetMapping("/generals/{generalId}")
    public GeneralResponseForm getOneGeneral(@PathVariable Long generalId) {
        return generalService.findOneGeneral(generalId);
    }

    // 글 수정
    @PutMapping("/generals/{generalId}")
    public Long updateGeneral(@PathVariable Long generalId, @RequestBody GeneralCreateForm generalCreateForm) {
        return generalService.updateGeneral(generalId, generalCreateForm);
    }

    // 글 삭제
    @DeleteMapping("/generals/{generalId}")
    public Long deleteGeneral(@PathVariable Long generalId) {
        return generalService.deleteGeneral(generalId);
    }
}
