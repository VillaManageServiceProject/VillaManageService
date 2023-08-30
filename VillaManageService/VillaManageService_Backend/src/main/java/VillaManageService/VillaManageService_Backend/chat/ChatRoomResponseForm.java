package VillaManageService.VillaManageService_Backend.chat;

import VillaManageService.VillaManageService_Backend.user.Member;
import lombok.Getter;

import java.util.List;

@Getter
public class ChatRoomResponseForm {
    private Long id;
    private String name;
    private List<String> participants;
    private ChatMessage recentChatMessage;

    public ChatRoomResponseForm(ChatRoom chatRoom) {
        this.id = chatRoom.getId();
        this.name = chatRoom.getName();
        this.participants = chatRoom.getParticipants().stream().map(Member::getName).toList();
        List<ChatMessage> chatMessages = chatRoom.getChatMessage();
        if(chatMessages.size() > 0) this.recentChatMessage = chatMessages.get(chatMessages.size() - 1);
        else this.recentChatMessage= null;
    }
}
