package VillaManageService.VillaManageService_Backend.chat;

import VillaManageService.VillaManageService_Backend.user.Member;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class ChatRoomRequestForm {
    @NotNull(message = "방제목은 필수항목입니다.")
    private String name;
    private List<Invitee> invitees;

    @Getter
    @Setter
    public static class Invitee {
        private String villaId;
        private String villaAddress;
        private List<Integer> residents;
        private List<Integer> landlords;
        private List<String> ccs;
        private List<String> bms;
    }
}