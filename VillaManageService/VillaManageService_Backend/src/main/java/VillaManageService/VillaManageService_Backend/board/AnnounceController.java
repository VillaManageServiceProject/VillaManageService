package VillaManageService.VillaManageService_Backend.board;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@AllArgsConstructor
public class AnnounceController {
    private final AnnounceService announceService;

//    public PostController(PostService postService) {
//        this.postService = postService;
//    }

    // 글 등록
    @PostMapping("/announces")
    public AnnounceResponseForm createAnnounce(@RequestBody AnnounceCreateForm announceCreateForm) {
        AnnounceResponseForm announce = announceService.createAnnounce(announceCreateForm);
        return announce;
    }

    // 전체 목록 조회
    @GetMapping("/announces/board/{villaId}")
    public List<AnnounceListResponseForm> getAllAnnounces(@PathVariable String villaId) {
        return announceService.findAllAnnounce(villaId);
    }

    @GetMapping("/announces/board/role/{villaId}")
    public HashMap<String, List> getAllAnnouncesByRole(@PathVariable String villaId, @RequestParam List<String> roles) {
        return announceService.findAllAnnounceByRole(villaId, roles);
    }

    @GetMapping("/announces/board/period/{villaId}")
    public List<AnnouncePeriodResponseForm> getAnnouncesPeriod(@PathVariable String villaId) {
        return announceService.readAnnouncePeriod(villaId);
    }

    // 글 하나 조회
    @GetMapping("/announces/{announceId}")
    public AnnounceResponseForm getOneAnnounce(@PathVariable Long announceId) {
        return announceService.findOneAnnounce(announceId);
    }

    // 글 수정
    @PutMapping("/announces/{announceId}")
    public Long updateAnnounce(@PathVariable Long announceId, @RequestBody AnnounceCreateForm announceCreateForm) {
        return announceService.updateAnnounce(announceId, announceCreateForm);
    }

    // 글 삭제
    @DeleteMapping("/announces/{announceId}")
    public Long deleteAnnounce(@PathVariable Long announceId) {
        return announceService.deleteAnnounce(announceId);
    }
}
