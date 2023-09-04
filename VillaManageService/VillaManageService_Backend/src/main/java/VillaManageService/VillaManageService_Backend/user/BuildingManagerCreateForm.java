package VillaManageService.VillaManageService_Backend.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BuildingManagerCreateForm extends MemberRequestForm {
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

    @NotBlank(message = "연락처는 필수항목입니다.")
    private String contactNumber;

    @NotBlank(message = "직함(부서)은 필수항목입니다.")
    private String department;

    @NotBlank(message = "관리 건물의 주소는 필수항목입니다.")
    private String manageVillaId;
}
