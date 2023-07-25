package VillaManageService.VillaManageService_Backend.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Landlord {
    @Id
    @Column(unique = true)
    private String id;

    private String password;

    private String name;

    private String contact_number;

    private String favorite;

    private String recent_search;

    @Column(unique = true)
    private String email;

    private int gender;

    private String contact_number_sub;

    private Date birth;

    private String owned_address;

    private int owned_address_detail;

    private String co_owner_id;
}
