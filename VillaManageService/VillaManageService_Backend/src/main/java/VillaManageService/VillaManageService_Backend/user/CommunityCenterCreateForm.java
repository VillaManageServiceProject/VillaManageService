package VillaManageService.VillaManageService_Backend.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommunityCenterCreateForm {
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
    private String ccId;

    @NotBlank(message = "연락처는 필수항목입니다.")
    private String contactNumber;

    @NotBlank(message = "직함(부서)는 필수항목입니다.")
    private String department;

    @NotBlank(message = "주민센터 주소는 필수항목입니다.")
    private String centerAddress;
}
