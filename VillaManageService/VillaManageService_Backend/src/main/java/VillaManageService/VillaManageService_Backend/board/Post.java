package VillaManageService.VillaManageService_Backend.board;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Post extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postId;

    private String publisherId;

    private String address;

    private String title;

    private String notification;

//    private String relatedMemberId;

    private String content;

    // requestDto 정보를 가져와서 entity 만들 때 사용
    public Post(PostCreateForm postCreateForm, String publisherId) {
        this.title = postCreateForm.getTitle();
        this.notification = postCreateForm.getNotification();
        this.content = postCreateForm.getContent();
        this.publisherId = publisherId;
        this.address = postCreateForm.getAddress();
    }

    // 업데이트 메소드
    public void update(PostCreateForm postCreateForm) {
        this.title = postCreateForm.getTitle();
        this.content = postCreateForm.getContent();
    }
}
