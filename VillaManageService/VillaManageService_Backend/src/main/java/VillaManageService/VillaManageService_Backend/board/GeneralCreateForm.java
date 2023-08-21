package VillaManageService.VillaManageService_Backend.board;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GeneralCreateForm {
    private String villaId;

    @NotNull(message = "제목은 필수항목입니다.")
    private String title;

    private String noticeType;

    @NotNull(message = "정상적인 주소가 아닙니다.")
    private String address;

//    private String relatedMemberId;

    @NotNull(message = "본문 내용은 필수항목입니다.")
    private String content;
}
