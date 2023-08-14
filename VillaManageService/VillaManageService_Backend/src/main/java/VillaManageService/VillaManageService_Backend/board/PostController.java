package VillaManageService.VillaManageService_Backend.board;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class PostController {
    private final PostService postService;

//    public PostController(PostService postService) {
//        this.postService = postService;
//    }

    // 글 등록
    @PostMapping("/posts")
    public PostResponseForm createPost(@RequestBody PostCreateForm postCreateForm) {
        PostResponseForm post = postService.createPost(postCreateForm);
        return post;
    }

    // 전체 목록 조회
    @GetMapping("/posts/board")
    public List<PostListResponseForm> getAllPosts() {
        return postService.findAllPost();
    }

    // 글 하나 조회
    @GetMapping("/posts/{postId}")
    public PostResponseForm getOnePost(@PathVariable Long postId) {
        return postService.findOnePost(postId);
    }

    // 글 수정
    @PutMapping("/posts/{postId}")
    public Long updatePost(@PathVariable Long postId, @RequestBody PostCreateForm postCreateForm) {
        return postService.updatePost(postId, postCreateForm);
    }

    // 글 삭제
    @DeleteMapping("/posts/{id}")
    public Long deletePost(@PathVariable Long postId) {
        return postService.deletePost(postId);
    }
}
