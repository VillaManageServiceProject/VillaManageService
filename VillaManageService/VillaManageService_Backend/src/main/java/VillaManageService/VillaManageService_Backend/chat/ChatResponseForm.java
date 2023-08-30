package VillaManageService.VillaManageService_Backend.chat;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatResponseForm {
    private Long  id;
    private String sender;
    private String content;
    private LocalDateTime createdAt;

    public ChatResponseForm(ChatMessage chatMessage) {
        this.id = chatMessage.getId();
        this.sender = chatMessage.getSender().getName();
        this.content = chatMessage.getContent();
        this.createdAt = chatMessage.getCreatedAt();
    }
}