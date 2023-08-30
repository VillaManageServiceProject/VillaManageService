package VillaManageService.VillaManageService_Backend.building;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VillaCreateForm {
    @NotBlank
    private String villaId;

    @NotNull(message = "주소는 필수항목입니다.")
    private String address;

    private int addressDetail;
}