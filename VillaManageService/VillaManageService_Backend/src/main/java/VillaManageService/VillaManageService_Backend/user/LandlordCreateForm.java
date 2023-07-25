package VillaManageService.VillaManageService_Backend.user;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class LandlordCreateForm {
    @Size(min = 3, max = 25)
    @NotBlank(message = "사용자 ID는 필수항목입니다.")
    private String id;

    @NotBlank(message = "비밀번호는 필수항목입니다.")
    private String password1;

    @NotBlank(message = "비밀번호 확인은 필수항목입니다.")
    private String password2;

    @NotBlank(message = "이름은 필수항목입니다.")
    private String name;

    @NotBlank(message = "연락처는 필수항목입니다.")
    private String contact_number;

    @Column(unique = true)
    private String email;

    @NotBlank(message = "성별은 필수항목입니다.")
    private int gender;

    @NotBlank(message = "비상연락처는 필수항목입니다.")
    private String contact_number_sub;

    @NotBlank(message = "생년월일은 필수항목입니다.")
    private Date birth;

    @NotBlank(message = "소유지 주소는 필수항목입니다.")
    private String owned_address;

    @NotBlank(message = "상세 주소는 필수항목입니다.")
    private int owned_address_detail;

    private String co_owner_id;
}
