package VillaManageService.VillaManageService_Backend.villa;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name = "response")
public class OpenAPIResponseForm {

    @XmlElement(name = "body")
    public Body body;

    public static class Body {
        @XmlElement(name = "items")
        public Items items;
    }

    public static class Items {
        @XmlElement(name = "item")
        public List<Item> item;
    }

    public static class Item {
        @XmlElement(name = "archArea")
        public double archArea;
        @XmlElement(name = "bldNm")
        public String bldNm;
        @XmlElement(name = "platArea")
        public double platArea;
        @XmlElement(name = "mainPurpsCdNm")
        public String mainPurpsCdNm;
    }
}