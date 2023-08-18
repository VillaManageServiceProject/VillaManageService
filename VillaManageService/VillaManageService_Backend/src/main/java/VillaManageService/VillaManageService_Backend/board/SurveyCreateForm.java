package VillaManageService.VillaManageService_Backend.board;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class SurveyCreateForm {
    @NotNull(message = "제목은 필수항목입니다.")
    private String title;

    @NotNull(message = "정상적인 주소가 아닙니다.")
    private String address;

    @NotNull(message = "설문 시작 일자는 필수항목입니다.")
    private Date dateStart;

    @NotNull(message = "설문 종료 일자는 필수항목입니다.")
    private Date dateEnd;

//    private String relatedMemberId;

    @NotNull(message = "질문은 필수항목입니다.")
    private String question;

    @NotNull(message = "선택지는 필수항목입니다.")
    private String options;
}
