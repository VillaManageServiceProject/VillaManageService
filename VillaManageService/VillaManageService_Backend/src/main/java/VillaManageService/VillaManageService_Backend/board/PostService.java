package VillaManageService.VillaManageService_Backend.board;

import VillaManageService.VillaManageService_Backend.board.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    // 글 생성
    public void createPost(PostCreateForm postCreateForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.isAuthenticated()){
            String publisherId = authentication.getName();
            Object c = authentication.getPrincipal();
            System.out.println(publisherId);
            Object a = authentication.getCredentials();
            System.out.println(a.toString());
            Object b = authentication.getDetails();
            System.out.println(b.toString());
        }
//        Post post = new Post(postCreateForm);
//        postRepository.save(post);
//        return new PostResponseForm(post);
        System.out.println("done");
    }

    // 모든 글 가져오기
    public List<PostListResponseForm> findAll() {
        try{
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
