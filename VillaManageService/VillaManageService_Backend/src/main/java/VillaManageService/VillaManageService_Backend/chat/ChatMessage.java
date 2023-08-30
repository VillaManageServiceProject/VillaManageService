package VillaManageService.VillaManageService_Backend.chat;

import VillaManageService.VillaManageService_Backend.board.Timestamped;
import VillaManageService.VillaManageService_Backend.user.Member;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class ChatMessage extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long  id;
    private String content;
//    private String sender;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private ChatRoom chatRoom;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Member sender;
    // getters and setters
}


//chat_rooms: 채팅방 정보 (chat_room_id, name, created_by, etc.)
//chat_messages: 채팅 메시지 정보 (message_id, chat_room_id, sender_id, message, timestamp)
//chat_room_members: 채팅방 멤버 정보 (chat_room_id, user_id)