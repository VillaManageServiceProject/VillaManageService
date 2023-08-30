package VillaManageService.VillaManageService_Backend.chat;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@AllArgsConstructor
@RequestMapping("/chat")
public class ChatController {
    private SimpMessagingTemplate simpMessagingTemplate;

    private ChatService chatService;

    private ChatRepository chatRepository;

    private ChatRoomRepository chatRoomRepository;

//    @GetMapping("/chatMembers")
//    public ResponseEntity<List<Map<String, Object>>> getChatMembers() {
//        return new ResponseEntity<>(chatService.getChatMembers(), HttpStatus.OK);
//    }

    @PostMapping("/createRoom")
    public ResponseEntity<ChatRoom> createChatRoom(@RequestBody ChatRoomRequestForm request) {
        ChatRoom chatRoom = chatService.createChatRoom(request);
        return new ResponseEntity<>(chatRoom, HttpStatus.CREATED);
    }

    @GetMapping("/board")
    public ResponseEntity<List<ChatRoomResponseForm>> getValidChatRooms() {
        return new ResponseEntity<>(chatService.getChatRooms(), HttpStatus.OK);
//                    chatService.getChatRooms();
        // id 포함된 채팅방들 찾아서 리턴
//        messageRepository.save(chatMessage); // save to DB
//        simpMessagingTemplate.convertAndSend("/topic/chat/" + roomId, chatMessage);
    }

    @SubscribeMapping("/{roomId}")
    public ChatRoomState subscribe(@DestinationVariable Long roomId, SimpMessageHeaderAccessor headerAccessor) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(roomId);
        if (chatRoom.isPresent()) {
            // Maybe add user to room, etc.
            // 채팅방 상태나 초기 메시지를 반환할 수 있습니다.
//            ChatRoomState initialState = getInitialState(roomId);
//            return initialState;
        } else {
            // Return an error message to the client.
            simpMessagingTemplate.convertAndSendToUser(
                    headerAccessor.getSessionId(),
                    "/queue/errors",
                    "Invalid room id: " + roomId
            );
            return null;
        }
        return null;
    }

    @MessageMapping("/{roomId}/sendMessage")
    public void sendMessage(@DestinationVariable String roomId, @Payload ChatMessage chatMessage) {
        chatRepository.save(chatMessage); // save to DB
        simpMessagingTemplate.convertAndSend("/topic/chat/" + roomId, chatMessage);
    }
}