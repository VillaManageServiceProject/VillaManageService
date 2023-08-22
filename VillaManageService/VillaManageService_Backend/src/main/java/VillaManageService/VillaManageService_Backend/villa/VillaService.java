package VillaManageService.VillaManageService_Backend.villa;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.lang.reflect.Field;
import java.net.URL;
import java.net.URLEncoder;

@RequiredArgsConstructor
@Service
public class VillaService {

//    private RestTemplate restTemplate;

    private final VillaRepository villaRepository;

//    public VillaService(RestTemplateBuilder restTemplateBuilder) {
//        this.restTemplate = restTemplateBuilder.build();
//    }

    private final WebClient webClient;

    private final ObjectMapper objectMapper;

    @Value("${PI_OPENAPI_KEY}")
    private String PI_OPENAPI_KEY;

//    @PostConstruct
//    public void init() {
//        webClient = webClientBuilder.baseUrl("https://api.example.com").build();
//    }

//    public VillaService(WebClient.Builder webClientBuilder) {
//        this.webClient = webClientBuilder.baseUrl("https://api.example.com").build();
//    }

    public boolean generateVilla(String villaId, String address, int addressDetail) throws Exception {
//        String sigunguCd = address.split(";")[1].substring(0,5);
//        String bjdongCd = address.split(";")[1].substring(5);
//        String[] addressElemnts = address.split(";")[0].split(" ");
//        String bun = String.format("%04d", Integer.parseInt(addressElemnts[addressElemnts.length - 1].split("-")[0]));
//        String ji = String.format("%04d", Integer.parseInt(addressElemnts[addressElemnts.length - 1].split("-")[1]));

        try {
            String villaInfo = requestVillaInfo(villaId);

            House house = new House();
            house.setId(villaId);
            house.setAddress(address);
            house.setAddressDetail(addressDetail);
            house.setVillaInfo(villaInfo);
//            house.setHouseInfo(houseInfo);
            this.villaRepository.save(house);
        } catch(Exception e) {
            throw e;
        }
        return true;
    }

    public String getInfo(String villaId){
        return this.villaRepository.findById(villaId).get().getVillaInfo();
    }

    private String requestVillaInfo(String villaId) throws Exception {
        String serviceType = "getBrTitleInfo";
        String sigunguCd = villaId.substring(0,5);
        String bjdongCd = villaId.substring(5,10);
        String bun = villaId.substring(10,14);
        String ji = villaId.substring(14,18);

        StringBuilder requestEndpoint = new StringBuilder("http://apis.data.go.kr/1613000/BldRgstService_v2/" + serviceType); /*URL*/
//        requestEndpoint.append("/" + URLEncoder.encode("getBrBasisOulnInfo","UTF-8")); /*Service Type*/
        requestEndpoint.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + PI_OPENAPI_KEY); /*Service Key*/
        requestEndpoint.append("&" + URLEncoder.encode("sigunguCd","UTF-8") + "=" + URLEncoder.encode(sigunguCd, "UTF-8")); /*시군구코드*/
        requestEndpoint.append("&" + URLEncoder.encode("bjdongCd","UTF-8") + "=" + URLEncoder.encode(bjdongCd, "UTF-8")); /*법정동코드*/
        requestEndpoint.append("&" + URLEncoder.encode("bun","UTF-8") + "=" + URLEncoder.encode(bun, "UTF-8")); /*번*/
        requestEndpoint.append("&" + URLEncoder.encode("ji","UTF-8") + "=" + URLEncoder.encode(ji, "UTF-8")); /*지*/
//        requestEndpoint.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("2", "UTF-8")); /*지*/

        try {
            String response = webClient.get()
                    .uri(new URL(requestEndpoint.toString()).toURI())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            System.out.println(response);
            OpenAPIResponseForm villaData = parseXml(response);
            return convertToJson(villaData);
        } catch(Exception e) {
            throw e;
        }
//        response.content.decode()
//        System.out.println(response.getBody());
//        return restTemplate.getForObject(requestEndpoint, MyResponse.class);
    }

    private OpenAPIResponseForm parseXml(String xmlData) throws JAXBException {
        JAXBContext jaxbContext = JAXBContext.newInstance(OpenAPIResponseForm.class);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        return (OpenAPIResponseForm) unmarshaller.unmarshal(new StringReader(xmlData));
    }

    private String convertToJson(OpenAPIResponseForm response) throws Exception {
        return objectMapper.writeValueAsString(response);
    }

//    public Items parseXmlToItems(String xmlContent) {
//        try {
//            JAXBContext jaxbContext = JAXBContext.newInstance(Items.class);
//            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
//            return (Items) unmarshaller.unmarshal(new StringReader(xmlContent));
//        } catch (JAXBException e) {
//            throw new RuntimeException("Error parsing XML", e);
//        }
//    }
}
