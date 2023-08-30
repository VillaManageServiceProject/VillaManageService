package VillaManageService.VillaManageService_Backend.chat;

import VillaManageService.VillaManageService_Backend.building.House;
import VillaManageService.VillaManageService_Backend.building.Villa;
import VillaManageService.VillaManageService_Backend.user.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class ChatService {
    @PersistenceContext
    private EntityManager entityManager;

    private ChatRoomRepository chatRoomRepository;

    private ChatRepository chatRepository;

    private MemberRepository memberRepository;
    private CommunityCenterRepository communityCenterRepository;

//    private SimpMessagingTemplate simpMessagingTemplate;

    public List<Map<String, Object>> getChatMembers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            Member user = memberRepository.findById(authentication.getName()).get();

            String villaId = "";
            String villaAddress = "";
            List<Integer> residents = new ArrayList<>();
            List<Integer> landlords = new ArrayList<>();
            List<String> ccs = new ArrayList<>();
            List<String> bms = new ArrayList<>();
            List<Map<String, Object>> members = new ArrayList<>();

            if (user.getRoles().contains(MemberRole.RESIDENT)) {
                Resident residentUser = (Resident) user;
                villaId = residentUser.getHouse().getVilla().getId();
                villaAddress = residentUser.getHouse().getVilla().getAddress();
                List<House> houses = residentUser.getHouse().getVilla().getHouses().stream().toList();
                residents.addAll(residentUser.getHouse().getVilla().getHouses().stream().filter(house -> house.getResidents().size() != 0).map(House::getAddressDetail).collect(Collectors.toList()));
                landlords.addAll(residentUser.getHouse().getVilla().getHouses().stream().filter(house -> house.getLandlord() != null).map(House::getAddressDetail).collect(Collectors.toList()));
                String localCC = residentUser.getHouse().getVilla().getLocalCC();
                if(!communityCenterRepository.findByLocalCC(localCC).isEmpty()) ccs.add(localCC);
                bms.addAll(residentUser.getHouse().getVilla().getBuildingManagers().stream().map(BuildingManager::getName).collect(Collectors.toList()));
                residents = residents.stream().filter((addressDetail) -> addressDetail != residentUser.getHouse().getAddressDetail()).collect(Collectors.toList());
                members.add(Map.of("villaId", villaId, "villaAddress", villaAddress, "residents", residents, "landlords", landlords, "ccs", ccs, "bms", bms));
            }
            else if (user.getRoles().contains(MemberRole.LANDLORD)) {
                Landlord landlordUser = (Landlord) user;
                for(Villa v : new ArrayList<>(landlordUser.getHouses().stream().map(house -> house.getVilla()).collect(Collectors.toSet()))) {
                    villaId = v.getId();
                    villaAddress = v.getAddress();
                    residents.addAll(v.getHouses().stream().filter(house -> house.getResidents().size() != 0).map(House::getAddressDetail).collect(Collectors.toList()));
                    landlords.addAll(v.getHouses().stream().filter(house -> house.getLandlord() != null && !house.getLandlord().equals(landlordUser)).map(House::getAddressDetail).collect(Collectors.toList()));
                    String localCC = landlordUser.getHouses().stream().findAny().get().getVilla().getLocalCC();
                    if(!communityCenterRepository.findByLocalCC(localCC).isEmpty()) ccs.add(localCC);
                    bms.addAll(v.getBuildingManagers().stream().map(BuildingManager::getName).collect(Collectors.toList()));
                    members.add(Map.of("villaId", villaId, "villaAddress", villaAddress, "residents", residents, "landlords", landlords, "ccs", ccs, "bms", bms));
                }
            }
            else if (user.getRoles().contains(MemberRole.BUILDING_MANAGER)) {
                BuildingManager BMUser = (BuildingManager) user;
                villaId = BMUser.getManageVilla().getId();
                villaAddress = BMUser.getManageVilla().getAddress();
                residents.addAll(BMUser.getManageVilla().getHouses().stream().filter(house -> house.getResidents().size() != 0).map(House::getAddressDetail).collect(Collectors.toList()));
                landlords.addAll(BMUser.getManageVilla().getHouses().stream().filter(house -> house.getLandlord() != null).map(House::getAddressDetail).collect(Collectors.toList()));
                ccs.add(BMUser.getManageVilla().getLocalCC());
                bms.addAll(BMUser.getManageVilla().getBuildingManagers().stream().map((buildingManager -> {if(buildingManager.getName() != BMUser.getName()) return buildingManager.getName(); else return null;})).collect(Collectors.toList()));
                members.add(Map.of("villaId", villaId, "villaAddress", villaAddress, "residents", residents, "landlords", landlords, "ccs", ccs, "bms", bms));
            }
            else if (user.getRoles().contains(MemberRole.COMMUNITY_CENTER)) {
                CommunityCenter CCUser = (CommunityCenter) user;

                TypedQuery<Villa> query = entityManager.createQuery("SELECT v FROM Villa v WHERE v.localCC = :localCC", Villa.class);
                query.setParameter("localCC", CCUser.getLocalCC());

                for(Villa v : query.getResultList()) {
                    villaId = v.getId();
                    villaAddress = v.getAddress();
                    residents.addAll(v.getHouses().stream().filter(house -> house.getResidents().size() != 0).map(House::getAddressDetail).collect(Collectors.toList()));
                    landlords.addAll(v.getHouses().stream().filter(house -> house.getLandlord() != null).map(House::getAddressDetail).collect(Collectors.toList()));
                    if(v.getLocalCC() != CCUser.getLocalCC()) ccs.add(v.getLocalCC());
                    bms.addAll(v.getBuildingManagers().stream().map(BuildingManager::getName).collect(Collectors.toList()));
                    members.add(Map.of("villaId", villaId, "villaAddress", villaAddress, "residents", residents, "landlords", landlords, "ccs", ccs, "bms", bms));
                }
            }

            return members;
        }
        return null;
    }

    @Transactional
    public ChatRoom createChatRoom(ChatRoomRequestForm chatRoomRequestForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            Member creator = entityManager.getReference(Member.class, authentication.getName());

            List<Member> combined = new ArrayList<>();

            chatRoomRequestForm.getInvitees().forEach(invitee -> {
                List<Member> residents = new ArrayList<>();
                List<Member> landlords = new ArrayList<>();
                Member communityCenter = null;
                List<Member> buildingManagers = new ArrayList<>();

                if(invitee.getResidents().size() > 0) {
                    TypedQuery<Member> residentQuery = entityManager.createQuery("SELECT r FROM Resident r JOIN r.house h JOIN h.villa v WHERE v.id = :villaId AND h.addressDetail IN :addressDetail", Member.class);
                    residentQuery.setParameter("villaId", invitee.getVillaId());
                    residentQuery.setParameter("addressDetail", invitee.getResidents());
                    residents = residentQuery.getResultList();
                }

                if(invitee.getLandlords().size() > 0) {
                    TypedQuery<Member> landlordQuery = entityManager.createQuery("SELECT l FROM Landlord l JOIN l.houses h JOIN h.villa v WHERE v.id = :villaId AND h.addressDetail IN :addressDetail", Member.class);
//                    TypedQuery<Member> landlordQuery = entityManager.createQuery("SELECT l FROM Landlord l JOIN l.houses h WHERE h.addressDetail IN :addressDetail", Member.class);
                    landlordQuery.setParameter("villaId", invitee.getVillaId());
                    landlordQuery.setParameter("addressDetail", invitee.getLandlords());
                    landlords = landlordQuery.getResultList();
//                    landlords.stream().filter((landlord) -> ((Landlord)landlord).getHouses().stream().filter((house -> house.getVilla().getId() == invitee.getVillaId())).collect(Collectors.toList()).size() > 0);
//                            .forEach((landlord) -> {
//                        Landlord member = (Landlord) landlord;
//                        member.getHouses().stream().filter((house) -> house.getVilla().getId() == invitee.getVillaId());
//                    });
                    Member t = landlords.get(0);
                }

                if(invitee.getCcs().size() > 0) {
                    TypedQuery<Member> ccQuery = entityManager.createQuery("SELECT c FROM CommunityCenter c WHERE c.localCC = :localCC", Member.class);
                    ccQuery.setParameter("localCC", invitee.getCcs().get(0));
                    communityCenter = ccQuery.getSingleResult();
                }

                if(invitee.getBms().size() > 0) {
                    TypedQuery<Member> bmQuery = entityManager.createQuery("SELECT b FROM BuildingManager b WHERE b.name IN :managerName", Member.class);
                    bmQuery.setParameter("managerName", invitee.getBms());
                    buildingManagers = bmQuery.getResultList();
                }

                combined.addAll(residents);
                combined.addAll(landlords);
                combined.addAll(buildingManagers);
                if(communityCenter != null) combined.add(communityCenter);
            });

            if(combined.size() > 0) {
                ChatRoom chatRoom = new ChatRoom();
                if(chatRoomRequestForm.getName() == "")chatRoom.setName(String.join(", ", combined.stream().map(Member::getName).collect(Collectors.toList())));
                else chatRoom.setName(chatRoomRequestForm.getName());
                chatRoom.setCreator(creator);
                chatRoom.setParticipants(combined);
                combined.forEach(member -> {member.getChatRooms().add(chatRoom);});
                chatRoomRepository.save(chatRoom);
//                return chatRoom;
            }
        }
        return null;
    }

    public List<ChatRoomResponseForm> getChatRooms() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            Member participant = entityManager.getReference(Member.class, authentication.getName());
            TypedQuery<ChatRoom> query = entityManager.createQuery(
                    "SELECT c FROM ChatRoom c WHERE :member MEMBER OF c.participants OR c.creator = :member",
                    ChatRoom.class
            );
            query.setParameter("member", participant);
            List<ChatRoom> chatRooms = query.getResultList();

            List<ChatRoomResponseForm> responseFormList = new ArrayList<>();

            for (ChatRoom chatRoom : chatRooms) {
                responseFormList.add(
                        new ChatRoomResponseForm(chatRoom)
                );
            }
            return responseFormList;
        }
        return null;
    }

    public List<ChatResponseForm> getChatMessages(Long roomId) {
            TypedQuery<ChatMessage> query = entityManager.createQuery(
                    "SELECT cm FROM ChatMessage cm JOIN cm.chatRoom cr WHERE cr.id = :roomId",
                    ChatMessage.class
            );
            query.setParameter("roomId", roomId);
            List<ChatMessage> chatMessages = query.getResultList();

            List<ChatResponseForm> responseFormList = new ArrayList<>();

            for (ChatMessage chatMessage : chatMessages) {
                responseFormList.add(
                        new ChatResponseForm(chatMessage)
                );
            }
            return responseFormList;
    }

//    public void inviteUsers(String chatRoomId, List<String> userIds) {
//        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
//                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
//
//        List<Member> usersToInvite = memberRepository.findAllById(userIds);
//
//        chatRoom.getMembers().addAll(usersToInvite);
//        chatRoomRepository.save(chatRoom);
//
//        // 이곳에서 실시간 알림 로직을 구현할 수 있습니다.
//    }

//    public void sendMessage(String roomId, String message) {
//        ChatRoom chatRoom = chatRooms.get(roomId);
//        if (chatRoom != null) {
//            simpMessagingTemplate.convertAndSend("/topic/" + roomId, message);
//        }
//    }

    @Transactional
    public ChatMessage saveChatMessage(Long roomId, ChatRequestForm chatRequestForm) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow();
        Member sender = memberRepository.findById(chatRequestForm.getSender()).orElseThrow();
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setContent(chatRequestForm.getContent());
        chatMessage.setChatRoom(chatRoom);
        chatMessage.setSender(sender);
        chatRoom.getChatMessage().add(chatMessage);
        return chatRepository.save(chatMessage);
    }
//
//    public ChatRoomState getInitialState(String roomId) {
//        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findById(roomId);
//        if (optionalChatRoom.isPresent()) {
//            ChatRoom chatRoom = optionalChatRoom.get();
//            ChatRoomState state = new ChatRoomState();
//            state.setRoomId(chatRoom.getId());
//            state.setRoomName(chatRoom.getName());
//            state.setParticipants(chatRoom.getParticipants());
//
//            // 예를 들어, DB에서 최근 10개의 메시지를 가져옵니다.
//            List<ChatMessage> recentMessages = chatRepository.findTop10ByRoomIdOrderByTimestampDesc(roomId);
//            state.setRecentMessages(recentMessages);
//
//            return state;
//        } else {
//            return null; // or throw an exception
//        }
//    }
}
