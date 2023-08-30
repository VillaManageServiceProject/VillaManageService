package VillaManageService.VillaManageService_Backend.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.net.URL;
import java.net.URLEncoder;

@RequiredArgsConstructor
@Service
public class OpenAPIService {
    private final ObjectMapper objectMapper;

    private final WebClient webClient;

    @Value("${PI_OPENAPI_KEY}")
    private String PI_OPENAPI_KEY;

    public String requestVillaInfo(String villaId) throws Exception {
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
            VillaInfoAPIResponseForm villaData = parseXml(response, VillaInfoAPIResponseForm.class);
            return convertToJson(villaData);
        } catch(Exception e) {
            throw e;
        }
//        response.content.decode()
//        System.out.println(response.getBody());
//        return restTemplate.getForObject(requestEndpoint, MyResponse.class);
    }

    public String requestLocalCommunityCenterOfVilla(String address) throws Exception {
//        String serviceType = "getBrTitleInfo";
//        String sigunguCd = villaId.substring(0,5);
//        String bjdongCd = villaId.substring(5,10);
//        String bun = villaId.substring(10,14);
//        String ji = villaId.substring(14,18);

        StringBuilder requestEndpoint = new StringBuilder("https://business.juso.go.kr/addrlink/addrLinkApi.do"); /*URL*/
//        requestEndpoint.append("/" + URLEncoder.encode("getBrBasisOulnInfo","UTF-8")); /*Service Type*/
        requestEndpoint.append("?" + URLEncoder.encode("confmKey","UTF-8") + "=" + "devU01TX0FVVEgyMDIzMDgyNzE5MTg0MzExNDA1MDc="); /*Service Key*/
        requestEndpoint.append("&" + URLEncoder.encode("keyword","UTF-8") + "=" + URLEncoder.encode(address, "UTF-8")); /*시군구코드*/
        requestEndpoint.append("&" + URLEncoder.encode("addInfoYn","UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8")); /*법정동코드*/
//        requestEndpoint.append("&" + URLEncoder.encode("bun","UTF-8") + "=" + URLEncoder.encode(bun, "UTF-8")); /*번*/
//        requestEndpoint.append("&" + URLEncoder.encode("ji","UTF-8") + "=" + URLEncoder.encode(ji, "UTF-8")); /*지*/
//        requestEndpoint.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("2", "UTF-8")); /*지*/

        try {
            String response = webClient.get()
                    .uri(new URL(requestEndpoint.toString()).toURI())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            System.out.println(response);
            LocalCCAPIResponseForm villaData = parseXml(response, LocalCCAPIResponseForm.class);
            return villaData.juso.get(0).hemdNm;
        } catch(Exception e) {
            throw e;
        }
//        response.content.decode()
//        System.out.println(response.getBody());
//        return restTemplate.getForObject(requestEndpoint, MyResponse.class);
    }

//    private LocalCCAPIResponseForm parseXml(String xmlData) throws JAXBException {
//        JAXBContext jaxbContext = JAXBContext.newInstance(LocalCCAPIResponseForm.class);
//        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
//        return (LocalCCAPIResponseForm) unmarshaller.unmarshal(new StringReader(xmlData));
//    }

    public <T> T parseXml(String xmlData, Class<T> type) throws JAXBException {
        JAXBContext jaxbContext = JAXBContext.newInstance(type);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        return (T) unmarshaller.unmarshal(new StringReader(xmlData));
    }

    public String convertToJson(OpenAPIResponseForm response) throws Exception {
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
