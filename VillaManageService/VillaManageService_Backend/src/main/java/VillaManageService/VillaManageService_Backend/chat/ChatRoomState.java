package VillaManageService.VillaManageService_Backend.chat;

import java.util.List;

public class ChatRoomState {
    private String roomId;
    private String roomName;
    private List<String> participants;
    private List<ChatMessage> recentMessages;
}