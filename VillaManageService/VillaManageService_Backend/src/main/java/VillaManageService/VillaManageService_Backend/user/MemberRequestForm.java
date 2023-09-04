package VillaManageService.VillaManageService_Backend.user;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.util.List;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "userType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = LandlordCreateForm.class, name = "LANDLORD"),
        @JsonSubTypes.Type(value = ResidentCreateForm.class, name = "RESIDENT"),
        @JsonSubTypes.Type(value = CommunityCenterCreateForm.class, name = "COMMUNITY_CENTER"),
        @JsonSubTypes.Type(value = BuildingManagerCreateForm.class, name = "BUILDING_MANAGER")
})
@Getter
@Setter
public class MemberRequestForm {
    @Size(min = 3, max = 25)
    @NotBlank(message = "사용자 ID는 필수항목입니다.")
    private String id;

    @NotBlank(message = "비밀번호는 필수항목입니다.")
    private String password1;

    @NotBlank(message = "비밀번호 확인은 필수항목입니다.")
    private String password2;

    @NotBlank(message = "이름은 필수항목입니다.")
    private String name;

    private List<String> favorites;
}
