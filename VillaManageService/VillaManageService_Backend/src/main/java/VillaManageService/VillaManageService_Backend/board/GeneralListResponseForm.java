package VillaManageService.VillaManageService_Backend.board;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GeneralListResponseForm {
    // 제목
    private String title;

    // 작성자명
    private String publisherId;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    // Entity -> dto
    public GeneralListResponseForm(General general) {
        this.title = general.getTitle();
        this.createdAt = general.getCreatedAt();
        this.modifiedAt = general.getModifiedAt();
        this.publisherId = general.getPublisherId();
    }

//    public PostListResponseForm(Optional<Post> post) {
//        this.title = post.get().getTitle();
//        this.createdAt = post.get().getCreatedAt();
//        this.modifiedAt = post.get().getModifiedAt();
//    }
}
