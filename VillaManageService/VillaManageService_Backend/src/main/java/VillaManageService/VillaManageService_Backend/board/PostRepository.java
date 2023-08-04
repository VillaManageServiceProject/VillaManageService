package VillaManageService.VillaManageService_Backend.board;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    Post findByPostId(Long postId);
    Post findByAddress(String address);
    Post findByTitle(String title);
    Post findByContent(String content);
    List<PostListResponseForm> findAllByOrderByModifiedAtDesc();
}
