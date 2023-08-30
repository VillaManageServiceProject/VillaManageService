package VillaManageService.VillaManageService_Backend.chat;

import lombok.Getter;

import java.util.List;

@Getter
public class ChatRoomResponseForm {
    private Long id;
    private String name;
    private ChatMessage recentChatMessage;

    public ChatRoomResponseForm(ChatRoom chatRoom) {
        this.id = chatRoom.getId();
        this.name = chatRoom.getName();
        List<ChatMessage> chatMessages = chatRoom.getChatMessage();
        if(chatMessages.size() > 0) this.recentChatMessage = chatMessages.get(chatMessages.size() - 1);
        else this.recentChatMessage= null;
    }
}
