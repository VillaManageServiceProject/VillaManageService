package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.user.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Post extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postId;

    private String publisherId;

    private String address;

    private String title;

    private String postTime;

    private String notification;

    private String relatedMemberId;

    private String content;

    // requestDto 정보를 가져와서 entity 만들 때 사용
    public Post(PostCreateForm postCreateForm, String publisherId, String address, String postTime) {
        this.title = postCreateForm.getTitle();
        this.content = postCreateForm.getContent();
        this.publisherId = publisherId;
        this.address = address;
        this.postTime = postTime;
    }

    // 업데이트 메소드
    public void update(PostCreateForm postCreateForm) {
        this.title = postCreateForm.getTitle();
        this.content = postCreateForm.getContent();
    }
}
