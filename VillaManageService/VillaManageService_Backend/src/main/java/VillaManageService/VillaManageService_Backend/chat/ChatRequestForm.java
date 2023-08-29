package VillaManageService.VillaManageService_Backend.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRequestForm {
    private Long chatRoomId;
    private Long senderId;
    private String content;
    // getters and setters
}