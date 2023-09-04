package VillaManageService.VillaManageService_Backend.user;

import jakarta.validation.constraints.*;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class LandlordCreateForm extends MemberRequestForm {
//    @Size(min = 3, max = 25)
//    @NotBlank(message = "사용자 ID는 필수항목입니다.")
//    private String id;
//
//    @NotBlank(message = "비밀번호는 필수항목입니다.")
//    private String password1;
//
//    @NotBlank(message = "비밀번호 확인은 필수항목입니다.")
//    private String password2;
//
//    @NotBlank(message = "이름은 필수항목입니다.")
//    private String name;

    @NotBlank(message = "이메일은 필수항목입니다.")
    private String email;

    @NotNull(message = "성별은 필수항목입니다.")
    private int gender;

    @NotBlank(message = "전화번호1은 필수항목입니다.")
    private String contactNumber;

    @NotBlank(message = "전화번호2는 필수항목입니다.")
    private String contactNumberSub;

    @NotNull(message = "생년월일은 필수항목입니다.")
    private Date birth;

    @NotBlank
    private String villaId;

    @NotNull(message = "소유지 주소는 필수항목입니다.")
    private String ownedAddress;

    @NotNull(message = "소유지 상세 주소는 필수항목입니다.")
    private int ownedAddressDetail;

    private String coOwnerId;

    private Boolean isMaster;
}
