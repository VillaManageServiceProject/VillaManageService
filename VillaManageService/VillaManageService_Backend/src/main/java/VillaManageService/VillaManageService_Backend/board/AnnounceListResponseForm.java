package VillaManageService.VillaManageService_Backend.board;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AnnounceListResponseForm {
    private Long announceId;

    // 제목
    private String title;

    // 작성자명
    private String publisherId;

    private String noticeType;

    private String context;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    // Entity -> dto
    public AnnounceListResponseForm(Announce announce) {
        this.announceId = announce.getAnnounceId();
        this.title = announce.getTitle();
        this.createdAt = announce.getCreatedAt();
        this.context = announce.getContent();
        this.noticeType = announce.getNoticeType();
        this.modifiedAt = announce.getModifiedAt();
        this.publisherId = announce.getPublisher().getId();
    }

//    public PostListResponseForm(Optional<Post> post) {
//        this.title = post.get().getTitle();
//        this.createdAt = post.get().getCreatedAt();
//        this.modifiedAt = post.get().getModifiedAt();
//    }
}
