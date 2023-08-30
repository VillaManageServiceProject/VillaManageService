package VillaManageService.VillaManageService_Backend.util;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

public abstract class OpenAPIResponseForm {}

@XmlRootElement(name = "response")
class VillaInfoAPIResponseForm extends OpenAPIResponseForm {

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

@XmlRootElement(name = "results")
class LocalCCAPIResponseForm extends OpenAPIResponseForm {
    //    @XmlElement
//    private Common common;
    @XmlElement
    public List<Juso> juso;
}

//class Common {
//    @XmlElement
//    private int totalCount;
//    @XmlElement
//    private int currentPage;
//    @XmlElement
//    private int countPerPage;
//    @XmlElement
//    private int errorCode;
//    @XmlElement
//    private String errorMessage;
//}

class Juso {
    @XmlElement
    String roadAddr;
    @XmlElement
    String roadAddrPart1;
    @XmlElement
    String roadAddrPart2;
    @XmlElement
    String jibunAddr;
    @XmlElement
    String engAddr;
    @XmlElement
    String zipNo;
    @XmlElement
    String admCd;
    @XmlElement
    String rnMgtSn;
    @XmlElement
    String bdMgtSn;
    @XmlElement
    String detBdNmList;
    @XmlElement
    String bdNm;
    @XmlElement
    String bdKdcd;
    @XmlElement
    String siNm;
    @XmlElement
    String sggNm;
    @XmlElement
    String emdNm;
    @XmlElement
    String liNm;
    @XmlElement
    String rn;
    @XmlElement
    String udrtYn;
    @XmlElement
    String buldMnnm;
    @XmlElement
    String buldSlno;
    @XmlElement
    String mtYn;
    @XmlElement
    String lnbrMnnm;
    @XmlElement
    String lnbrSlno;
    @XmlElement
    String emdNo;
    @XmlElement
    String hstryYn;
    @XmlElement
    String relJibun;
    @XmlElement
    String hemdNm;
}