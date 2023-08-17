package VillaManageService.VillaManageService_Backend.user;

import jakarta.validation.constraints.*;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ResidentCreateForm {
    @Size(min = 3, max = 25)
    @NotBlank(message = "사용자 ID는 필수항목입니다.")
    private String id;

    @NotBlank(message = "비밀번호는 필수항목입니다.")
    private String password1;

    @NotBlank(message = "비밀번호 확인은 필수항목입니다.")
    private String password2;

    @NotBlank(message = "이름은 필수항목입니다.")
    private String name;

    @NotBlank
    private String villaId;

    @NotBlank(message = "주소는 필수항목입니다.")
    private String address;

    @NotNull(message = "상세 주소는 필수항목입니다.")
    private int addressDetail;

    @NotNull(message = "이메일은 필수항목입니다.")
    private String email;

    @NotNull(message = "성별은 필수항목입니다.")
    private int gender;

    @NotBlank(message = "전화번호1은 필수항목입니다.")
    private String contactNumber;

    @NotBlank(message = "전화번호2는 필수항목입니다.")
    private String contactNumberSub;

    @NotNull(message = "생년월일은 필수항목입니다.")
    private Date birth;

    @NotBlank(message = "세대주와의 관계는 필수항목입니다.")
    private String relationHousehold;

    @NotNull(message = "계약자는 필수항목입니다.")
    private Boolean isContractor;

    private Boolean isMaster;

    @NotNull(message = "본 건물 소유 여부는 필수항목입니다.")
    private Boolean isOwner;
}
