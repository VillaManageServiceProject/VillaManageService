package VillaManageService.VillaManageService_Backend.chat;

import VillaManageService.VillaManageService_Backend.user.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "chat_room_id")
    private Long id;
    @NotNull
    private String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member creator;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private List<Member> participants;
    @OneToMany
    private List<ChatMessage> chatMessage;
}