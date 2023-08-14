package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.board.PostRepository;
import VillaManageService.VillaManageService_Backend.user.*;
import lombok.AllArgsConstructor;
import org.springframework.cglib.beans.BulkBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final MemberRepository memberRepository;

    // 글 생성
    public PostResponseForm createPost(PostCreateForm postCreateForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated()) {
            String publisherId = authentication.getName();
            Optional<Member> _member = memberRepository.findById(publisherId);
            Member member = _member.get();
            Post post = new Post(postCreateForm, publisherId);
            postRepository.save(post);
            return new PostResponseForm(post);
        }
        return null;
    }

    // 모든 글 가져오기
    public List<PostListResponseForm> findAllPost() {
        try {
            List<Post> PostList = postRepository.findAll();

            List<PostListResponseForm> responseFormList = new ArrayList<>();

            for (Post Post : PostList) {
                responseFormList.add(
                        new PostListResponseForm(Post)
                );
            }
            return responseFormList;
        } catch (Exception e) {
//            throw new DBEmptyDataException("a");
        }
        return null;
    }

    // 글 하나 가져오기
    public PostResponseForm findOnePost(Long postId) {
//        Post post = postRepository.findByPostId(postId).orElseThrow(
//                () -> new IllegalArgumentException("조회 실패")
//        );
        Post post = postRepository.findByPostId(postId);
        if (post == null) {
            throw new IllegalArgumentException("조회 실패");
        }
        return new PostResponseForm(post);
    }

    // 글 수정
    @Transactional
    public Long updatePost(Long postId, PostCreateForm requestForm) {
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다.")
        );
        post.update(requestForm);
        return post.getPostId();
    }

    // 삭제
    @Transactional
    public Long deletePost(Long postId) {
        postRepository.deleteById(postId);
        return postId;
    }
}
