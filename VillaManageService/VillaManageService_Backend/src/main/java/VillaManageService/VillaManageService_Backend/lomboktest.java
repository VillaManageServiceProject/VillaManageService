package VillaManageService.VillaManageService_Backend;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
public class lomboktest {

    private final String hello;
    private final int lombok;

    public static void main(String[] args) {
        lomboktest helloLombok = new lomboktest("헬로", 5);


        System.out.println(helloLombok.getHello());
        System.out.println(helloLombok.getLombok());
    }
}

