package VillaManageService.VillaManageService_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class VillaManageServiceBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(VillaManageServiceBackendApplication.class, args);
    }

}
