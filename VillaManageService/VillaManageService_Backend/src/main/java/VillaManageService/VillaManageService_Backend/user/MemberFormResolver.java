//package VillaManageService.VillaManageService_Backend.user;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.http.HttpServletRequest;
//import lombok.AllArgsConstructor;
//import org.springframework.core.MethodParameter;
//        import org.springframework.stereotype.Component;
//        import org.springframework.web.bind.support.WebDataBinderFactory;
//        import org.springframework.web.context.request.NativeWebRequest;
//        import org.springframework.web.method.support.HandlerMethodArgumentResolver;
//        import org.springframework.web.method.support.ModelAndViewContainer;
//
////        import javax.servlet.http.HttpServletRequest;
//        import java.io.InputStream;
//
//@Component
//@AllArgsConstructor
//public class MemberFormResolver implements HandlerMethodArgumentResolver {
//
//    private final ObjectMapper objectMapper;
//
////    public MemberFormResolver(ObjectMapper objectMapper) {
////        this.objectMapper = objectMapper;
////    }
//
//    @Override
//    public boolean supportsParameter(MethodParameter parameter) {
//        return MemberRequestForm.class.isAssignableFrom(parameter.getParameterType());
//    }
//
//    @Override
//    public Object resolveArgument(MethodParameter parameter,
//                                  ModelAndViewContainer mavContainer,
//                                  NativeWebRequest webRequest,
//                                  WebDataBinderFactory binderFactory) throws Exception {
//
//        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
//        String userType = String.valueOf(webRequest);
//
////        String userType = webRequest.getParameter("userType");
////        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
////        String is = IOUtils.toString(request.getReader());
//
//        try (InputStream is = request.getInputStream()) {
//            if ("RESIDENT".equalsIgnoreCase(userType)) {
//                return objectMapper.readValue(is, ResidentCreateForm.class);
//            } else if ("LANDLORD".equalsIgnoreCase(userType)) {
//                return objectMapper.readValue(is, LandlordCreateForm.class);
//            } else if ("COMMUNITY_CENTER".equalsIgnoreCase(userType)) {
//                return objectMapper.readValue(is, CommunityCenterCreateForm.class);
//            } else if ("BUILDING_MANAGER".equalsIgnoreCase(userType)) {
//                return objectMapper.readValue(is, BuildingManagerCreateForm.class);
//            }
//        }
//
//        throw new IllegalArgumentException("Invalid userType");
//    }
//}
