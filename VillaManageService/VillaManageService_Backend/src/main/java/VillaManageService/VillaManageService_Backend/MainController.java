package VillaManageService.VillaManageService_Backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

    @GetMapping("/VillaManageService")
    @ResponseBody
    public String index(){
        return "index";
    }
}
