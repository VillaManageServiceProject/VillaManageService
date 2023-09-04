package VillaManageService.VillaManageService_Backend.chat;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@AllArgsConstructor
//@RequestMapping("/chat")
public class ChatController {
    private SimpMessagingTemplate simpMessagingTemplate;

    private ChatService chatService;

    private ChatRepository chatRepository;

    private ChatRoomRepository chatRoomRepository;

    @GetMapping("/chat/chatMembers")
    public ResponseEntity<List<Map<String, Object>>> getChatMembers() {
        return new ResponseEntity<>(chatService.getChatMembers(), HttpStatus.OK);
    }

    @PostMapping("/chat/createRoom")
    public ResponseEntity<String> createChatRoom(@RequestBody ChatRoomRequestForm request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder("Validation failed. ");

            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            }

            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        ChatRoom chatRoom = chatService.createChatRoom(request);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/chat/board")
    public ResponseEntity<List<ChatRoomResponseForm>> getValidChatRooms() {
        return new ResponseEntity<>(chatService.getChatRooms(), HttpStatus.OK);
//                    chatService.getChatRooms();
        // id 포함된 채팅방들 찾아서 리턴
//        messageRepository.save(chatMessage); // save to DB
//        simpMessagingTemplate.convertAndSend("/topic/chat/" + roomId, chatMessage);
    }

    @GetMapping("/chat/room/{roomId}/pre")
    public ResponseEntity<List<ChatResponseForm>> getInRoom(@PathVariable Long roomId) {
        return new ResponseEntity<>(chatService.getChatMessages(roomId), HttpStatus.OK);
    }

//    @SubscribeMapping("/chat/{roomId}/sub")
//    public ChatRoomState subscribe(@DestinationVariable Long roomId, SimpMessageHeaderAccessor headerAccessor) {
//        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(roomId);
//        if (chatRoom.isPresent()) {
//            // Maybe add user to room, etc.
//            // 채팅방 상태나 초기 메시지를 반환할 수 있습니다.
////            ChatRoomState initialState = getInitialState(roomId);
////            return initialState;
//        } else {
//            // Return an error message to the client.
//            simpMessagingTemplate.convertAndSendToUser(
//                    headerAccessor.getSessionId(),
//                    "/queue/errors",
//                    "Invalid room id: " + roomId
//            );
//            return null;
//        }
//        return null;
//    }

    @MessageMapping("/chat/{roomId}")
    public void sendMessage(@DestinationVariable Long roomId, @Payload ChatRequestForm chatRequestForm) {
        ChatResponseForm chatResponseForm = new ChatResponseForm(chatService.saveChatMessage(roomId, chatRequestForm));
        simpMessagingTemplate.convertAndSend("/topic/chat/" + roomId, chatResponseForm);
    }

//    @MessageMapping("/hello")
//    @SendTo("/topic/greetings")
//    public Greeting greeting(HelloMessage message) throws Exception {
//        System.out.println(message.getName());
//        return new Greeting("Hello WORK, " + message.getName() + "!");
//    }
}