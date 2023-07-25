//package VillaManageService.VillaManageService_Backend.user;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@Service
//public class BuildingManagerSecurityService implements UserDetailsService {
//
//    private final BuildingManagerRepository buildingManagerRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
//        Optional<BuildingManager> _buildingManager = this.buildingManagerRepository.findByid(id);
//        if (_buildingManager.isEmpty()) {
//            throw new UsernameNotFoundException("사용자를 찾을수 없습니다.");
//        }
//        BuildingManager buildingManager = _buildingManager.get();
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        if ("admin".equals(id)) {
//            authorities.add(new SimpleGrantedAuthority(BuildingManagerRole.ADMIN.getValue()));
//        } else {
//            authorities.add(new SimpleGrantedAuthority(BuildingManagerRole.USER.getValue()));
//        }
//        return new User(buildingManager.getId(), buildingManager.getPassword(), authorities);
//    }
//}
