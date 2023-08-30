package VillaManageService.VillaManageService_Backend.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRequestForm {
    private String sender;
    private String content;
}