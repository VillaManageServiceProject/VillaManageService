package VillaManageService.VillaManageService_Backend.building;

import VillaManageService.VillaManageService_Backend.chat.ChatRoom;
import VillaManageService.VillaManageService_Backend.util.OpenAPIService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class VillaService {

    private RestTemplate restTemplate;

    @PersistenceContext
    private EntityManager entityManager;

    private final VillaRepository villaRepository;

    private final HouseRepository houseRepository;

    private final OpenAPIService openAPIService;

    @Transactional
    public Villa generateVilla(String villaId, String address, House house) throws Exception {
        try {
            Optional<Villa> v = this.villaRepository.findById(villaId);
            if(v.isEmpty()) {
                String villaInfo = openAPIService.requestVillaInfo(villaId);

                Villa villa = new Villa();
                villa.setId(villaId);
                villa.setVillaInfo(villaInfo);
                villa.setAddress(address);
                villa.getHouses().add(house);
                villa.setLocalCC(openAPIService.requestLocalCommunityCenterOfVilla(address));

                house.setVilla(villa);

                this.villaRepository.save(villa);
                return villa;
            } else {
                Villa villa = v.get();
                villa.getHouses().add(house);

                house.setVilla(villa);

                return villa;
            }
        } catch(Exception e) {
            throw e;
        }
    }

    @Transactional
    public House generateHouse(String villaId, int addressDetail) throws Exception {
        try {
            Optional<House> h = this.houseRepository.findById(villaId + String.valueOf(addressDetail));
            if(h.isEmpty()) {
                House house = new House();
                house.setId(villaId + String.valueOf(addressDetail));
                house.setAddressDetail(addressDetail);
//            house.setVilla(villa);
                this.houseRepository.save(house);

                return house;
            }
            return h.get();

//            Villa villa = this.villaRepository.findById(villaId).get();

//            TypedQuery<Villa> query = entityManager.createQuery(
//                    "SELECT v FROM Villa v JOIN FETCH v.houses WHERE v.id = :villaId",
//                    Villa.class
//            );
//            query.setParameter("villaId", villaId);
//            Villa villa = query.getSingleResult();
//            List<House> houses = villa.getHouses();

//            List<House> houses = villa.getHouses();
//
//            House house;
//            if(houses.size() == 0) {
//                house = new House();
//                house.setAddressDetail(addressDetail);
//                house.setVilla(villa);
////                      house.setHouseInfo(houseInfo);
//
//                this.houseRepository.save(house);
//                return house;
//            }
//            else return houses.get(0);

//            House savedHouse = villa.getHouses().stream()
//                    .filter(house -> addressDetail == house.getAddressDetail())
//                    .findFirst().orElseGet(() -> {
//                        House house = new House();
//                        house.setAddressDetail(addressDetail);
//                        house.setVilla(villa);
//                        villa.getHouses().add(house);
////                      house.setHouseInfo(houseInfo);
//
//                        this.houseRepository.save(house);
//                        return house;
//                    });

//            return savedHouse;
        } catch(Exception e) {
            throw e;
        }
    }

    public Villa getInfo(String villaId){
        return this.villaRepository.findById(villaId).get();
    }


}
