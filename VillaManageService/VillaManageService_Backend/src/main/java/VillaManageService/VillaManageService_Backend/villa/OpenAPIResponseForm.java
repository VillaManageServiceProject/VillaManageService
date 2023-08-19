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
        @XmlElement(name = "hhldCnt") // 세대수
        public int hhldCnt;
        @XmlElement(name = "fmlyCnt") // 가구수
        public int fmlyCnt;
        @XmlElement(name = "grndFlrCnt") // 지상층수
        public int grndFlrCnt;
        @XmlElement(name = "ugrndFlrCnt") // 지하층수
        public int ugrndFlrCnt;
        @XmlElement(name = "hoCnt") // 호수
        public int hoCnt;
        @XmlElement(name = "useAprDay") // 사용승인일
        public String useAprDay;
        @XmlElement(name = "platPlc") // 대지위치
        public String platPlc;
        @XmlElement(name = "sigunguCd") // 시군구코드
        public String sigunguCd;
        @XmlElement(name = "bjdongCd") // 법정동코드
        public String bjdongCd;
        @XmlElement(name = "bun") // 번
        public String bun;
        @XmlElement(name = "ji") // 지
        public String ji;
        @XmlElement(name = "bldNm") // 건물명
        public String bldNm;
        @XmlElement(name = "archArea") // 건축면적
        public double archArea;
    }
}