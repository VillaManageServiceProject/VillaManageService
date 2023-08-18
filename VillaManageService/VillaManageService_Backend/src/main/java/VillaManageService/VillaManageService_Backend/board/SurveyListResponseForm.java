package VillaManageService.VillaManageService_Backend.board;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SurveyListResponseForm {
    // 제목
    private String title;

    // 작성자명
    private String publisherId;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    // Entity -> dto
    public SurveyListResponseForm(Survey survey) {
        this.publisherId = survey.getPublisherId();
        this.title = survey.getTitle();
        this.createdAt = survey.getCreatedAt();
        this.modifiedAt = survey.getModifiedAt();
    }

//    public PostListResponseForm(Optional<Post> post) {
//        this.title = post.get().getTitle();
//        this.createdAt = post.get().getCreatedAt();
//        this.modifiedAt = post.get().getModifiedAt();
//    }
}
