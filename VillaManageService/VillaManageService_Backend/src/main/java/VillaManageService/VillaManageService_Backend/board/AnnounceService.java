package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.user.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@AllArgsConstructor
public class AnnounceService {

    private final AnnounceRepository announceRepository;

    private final MemberRepository memberRepository;

    @PersistenceContext
    private EntityManager entityManager;

    // 글 생성
    public AnnounceResponseForm createAnnounce(AnnounceCreateForm announceCreateForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            String publisherId = authentication.getName();
//            Optional<Member> _member = memberRepository.findById(publisherId);
//            Member member = _member.get();
            Member memberReference = entityManager.getReference(Member.class, publisherId);
            Announce announce = new Announce(announceCreateForm, memberReference);
            announceRepository.save(announce);
            return new AnnounceResponseForm(announce);
        }
        return null;
    }

    // 모든 글 가져오기
    public List<AnnounceListResponseForm> findAllAnnounce(String villaId) {
        try {
            List<Announce> announceList = announceRepository.findByVillaIdOrderByModifiedAtDesc(villaId);

            List<AnnounceListResponseForm> responseFormList = new ArrayList<>();

            for (Announce Announce : announceList) {
                responseFormList.add(
                        new AnnounceListResponseForm(Announce)
                );
            }
            return responseFormList;
        } catch (Exception e) {
//            throw new DBEmptyDataException("a");
        }
        return null;
    }

    public HashMap<String, List> findAllAnnounceByRole(String villaId, List<String> roles) {
        HashMap<String, List> responseFormMap = new HashMap<>();

        for(String role : roles) {
            List<Announce> announceByRoleList;
            try {
                announceByRoleList = announceRepository.findAnnouncesByVillaIdAndNoticeTypeAndPublisherHasRole(villaId, "important", MemberRole.valueOf(role));
            } catch(Exception e) {
                continue;
            }
            List<AnnounceListResponseForm> responseFormList = new ArrayList<>();
            for (Announce Announce : announceByRoleList) {
                responseFormList.add(
                        new AnnounceListResponseForm(Announce)
                );
            }

            responseFormMap.put(role, responseFormList);
        }

        return responseFormMap;
    }

    public List<AnnouncePeriodResponseForm> readAnnouncePeriod(String villaId) {
        try {
            List<Announce> announceList = announceRepository.findByVillaIdOrderByModifiedAtDesc(villaId);

            List<AnnouncePeriodResponseForm> responseFormList = new ArrayList<>();

            for (Announce Announce : announceList) {
                responseFormList.add(
                        new AnnouncePeriodResponseForm(Announce)
                );
            }

            return responseFormList;
        } catch (Exception e) {
//            throw new DBEmptyDataException("a");
        }
        return null;
    }

//    public HashMap<String, List> findAllAnnounceByRole(String villaId, List<String> roles) {
//        HashMap<String, List> responseFormMap = new HashMap<>();
//
//        for(String role : roles) {
//            List<Announce> announceByRoleList;
//            try {
//                announceByRoleList = announceRepository.findAnnouncesByVillaIdAndNoticeTypeAndPublisherHasRole(villaId, "important", MemberRole.valueOf(role));
//            } catch(Exception e) {
//                continue;
//            }
//            List<AnnounceListResponseForm> responseFormList = new ArrayList<>();
//            for (Announce Announce : announceByRoleList) {
//                responseFormList.add(
//                        new AnnounceListResponseForm(Announce)
//                );
//            }
//
//            responseFormMap.put(role, responseFormList);
//        }
//
//        return responseFormMap;
//    }

    // 글 하나 가져오기
    public AnnounceResponseForm findOneAnnounce(Long announceId) {
//        Post post = postRepository.findByPostId(postId).orElseThrow(
//                () -> new IllegalArgumentException("조회 실패")
//        );
        Announce announce = announceRepository.findByAnnounceId(announceId);
        if (announce == null) {
            throw new IllegalArgumentException("조회 실패");
        }
        return new AnnounceResponseForm(announce);
    }

    // 글 수정
    @Transactional
    public Long updateAnnounce(Long announceId, AnnounceCreateForm requestForm) {
        Announce announce = announceRepository.findById(announceId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
        );
        announce.updateAnnounce(requestForm);
        return announce.getAnnounceId();
    }

    // 삭제
    @Transactional
    public Long deleteAnnounce(Long announceId) {
        announceRepository.deleteById(announceId);
        return announceId;
    }
}
