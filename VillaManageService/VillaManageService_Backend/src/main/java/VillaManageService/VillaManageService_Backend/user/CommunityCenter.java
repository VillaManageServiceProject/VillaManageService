package VillaManageService.VillaManageService_Backend.user;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class CommunityCenter extends Member{
    private String ccId; // 시군구 코드(5자리) + 법정동 코드(5자리) + 번(4자리) + 지(4자리)

    @NotNull
    private String localCC;

    private String department;

    private String centerAddress;
}
