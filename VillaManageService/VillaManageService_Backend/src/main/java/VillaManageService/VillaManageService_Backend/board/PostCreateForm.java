package VillaManageService.VillaManageService_Backend.board;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class PostCreateForm {
    @NotNull(message = "제목은 필수항목입니다.")
    private String title;

    private String notification;

    @NotNull(message = "정상적인 주소가 아닙니다.")
    private String address;

//    private String relatedMemberId;

    @NotNull(message = "본문 내용은 필수항목입니다.")
    private String content;
}
