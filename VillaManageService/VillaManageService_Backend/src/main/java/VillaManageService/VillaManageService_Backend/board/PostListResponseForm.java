package VillaManageService.VillaManageService_Backend.board;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Optional;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PostListResponseForm {
    // 제목
    private String title;

    // 작성자명
    private String publisherId;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    // Entity -> dto
    public PostListResponseForm(Post post) {
        this.title = post.getTitle();
        this.createdAt = post.getCreatedAt();
        this.modifiedAt = post.getModifiedAt();
        this.publisherId = post.getPublisherId();
    }

//    public PostListResponseForm(Optional<Post> post) {
//        this.title = post.get().getTitle();
//        this.createdAt = post.get().getCreatedAt();
//        this.modifiedAt = post.get().getModifiedAt();
//    }
}
