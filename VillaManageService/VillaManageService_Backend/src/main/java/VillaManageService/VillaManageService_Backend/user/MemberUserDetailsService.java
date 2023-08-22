package VillaManageService.VillaManageService_Backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Optional<Member> _member = this.memberRepository.findById(id);
        if (_member.isEmpty()) {
            throw new UsernameNotFoundException("사용자를 찾을수 없습니다.");
        }
        Member member = _member.get();
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (MemberRole role : member.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(role.getValue()));
        }
//        if (member.getRole().equals(MemberRole.ADMIN)) {
//            authorities.add(new SimpleGrantedAuthority(MemberRole.ADMIN.getValue()));
//        } else if (member.getRole().equals(MemberRole.RESIDENT)){
//            authorities.add(new SimpleGrantedAuthority(MemberRole.RESIDENT.getValue()));
//        } else if (member.getRole().equals(MemberRole.LANDLORD)){
//            authorities.add(new SimpleGrantedAuthority(MemberRole.LANDLORD.getValue()));
//        } else if (member.getRole().equals(MemberRole.BUILDING_MANAGER)){
//            authorities.add(new SimpleGrantedAuthority(MemberRole.BUILDING_MANAGER.getValue()));
//        } else if (member.getRole().equals(MemberRole.COMMUNITY_CENTER)){
//            authorities.add(new SimpleGrantedAuthority(MemberRole.COMMUNITY_CENTER.getValue()));
//        }
        return new User(member.getId(), member.getPassword(), authorities);
    }

}
