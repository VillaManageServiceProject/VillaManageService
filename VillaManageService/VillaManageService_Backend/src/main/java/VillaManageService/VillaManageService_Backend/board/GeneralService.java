package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.user.*;
import VillaManageService.VillaManageService_Backend.villa.Villa;
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
public class GeneralService {

    private final GeneralRepository generalRepository;

    private final MemberRepository memberRepository;

    @PersistenceContext
    private EntityManager entityManager;

    // 글 생성
    public GeneralResponseForm createGeneral(GeneralCreateForm generalCreateForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            String publisherId = authentication.getName();
//            Optional<Member> _member = memberRepository.findById(publisherId);
//            Member member = _member.get();
            Member memberReference = entityManager.getReference(Member.class, publisherId);
            General general = new General(generalCreateForm, memberReference);
            generalRepository.save(general);
            return new GeneralResponseForm(general);
        }
        return null;
    }

    // 모든 글 가져오기
    public List<GeneralListResponseForm> findAllGeneral(String villaId) {
        try {
            List<General> generalList = generalRepository.findByVillaIdOrderByModifiedAtDesc(villaId);

            List<GeneralListResponseForm> responseFormList = new ArrayList<>();

            for (General General : generalList) {
                responseFormList.add(
                        new GeneralListResponseForm(General)
                );
            }
            return responseFormList;
        } catch (Exception e) {
//            throw new DBEmptyDataException("a");
        }
        return null;
    }

    public HashMap<String, List> findAllGeneralByRole(String villaId, List<String> roles) {
        HashMap<String, List> responseFormMap = new HashMap<>();

        for(String role : roles) {
            List<General> generalByRoleList;
            try {
                generalByRoleList = generalRepository.findGeneralsByVillaIdAndPublisherHasRole(villaId, MemberRole.valueOf(role));
            } catch(Exception e) {
                continue;
            }
            List<GeneralListResponseForm> responseFormList = new ArrayList<>();
            for (General General : generalByRoleList) {
                responseFormList.add(
                        new GeneralListResponseForm(General)
                );
            }

            responseFormMap.put(role, responseFormList);
        }

        return responseFormMap;
    }

    public HashMap<String, List> findAllAnnounceByRole(String villaId, List<String> roles) {
        HashMap<String, List> responseFormMap = new HashMap<>();

        for(String role : roles) {
            List<General> generalByRoleList;
            try {
                generalByRoleList = generalRepository.findGeneralsByVillaIdAndNoticeTypeAndPublisherHasRole(villaId, "important", MemberRole.valueOf(role));
            } catch(Exception e) {
                continue;
            }
            List<GeneralListResponseForm> responseFormList = new ArrayList<>();
            for (General General : generalByRoleList) {
                responseFormList.add(
                        new GeneralListResponseForm(General)
                );
            }

            responseFormMap.put(role, responseFormList);
        }

        return responseFormMap;
    }

    // 글 하나 가져오기
    public GeneralResponseForm findOneGeneral(Long generalId) {
//        Post post = postRepository.findByPostId(postId).orElseThrow(
//                () -> new IllegalArgumentException("조회 실패")
//        );
        General general = generalRepository.findByGeneralId(generalId);
        if (general == null) {
            throw new IllegalArgumentException("조회 실패");
        }
        return new GeneralResponseForm(general);
    }

    // 글 수정
    @Transactional
    public Long updateGeneral(Long generalId, GeneralCreateForm requestForm) {
        General general = generalRepository.findById(generalId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
        );
        general.updateGeneral(requestForm);
        return general.getGeneralId();
    }

    // 삭제
    @Transactional
    public Long deleteGeneral(Long generalId) {
        generalRepository.deleteById(generalId);
        return generalId;
    }
}
