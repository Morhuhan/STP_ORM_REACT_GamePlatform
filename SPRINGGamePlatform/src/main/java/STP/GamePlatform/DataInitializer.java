package STP.GamePlatform;

import STP.GamePlatform.Entities.Game;
import STP.GamePlatform.Entities.GamePlatform;
import STP.GamePlatform.Entities.Platform;
import STP.GamePlatform.Services.GamePlatformService;
import STP.GamePlatform.Services.GameService;
import STP.GamePlatform.Services.PlatformService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final PlatformService platformService;
    private final GamePlatformService gamePlatformService;
    private final GameService gameService;

    public DataInitializer(PlatformService platformService, GamePlatformService gamePlatformService, GameService gameService) {
        this.platformService = platformService;
        this.gamePlatformService = gamePlatformService;
        this.gameService = gameService;
    }

    @Override
    public void run(String... args) throws Exception {

        // Добавление платформ
        Platform steam = new Platform("Steam", "Digital distribution platform", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1200px-Steam_icon_logo.svg.png");
        Platform origin = new Platform("Origin", "EA's digital distribution platform", "https://cdn.worldvectorlogo.com/logos/origin-4.svg");

        platformService.addPlatform(steam);
        platformService.addPlatform(origin);

        // Добавление игровых платформ
        GamePlatform steamWindows = new GamePlatform(steam, "steamWindows", "https://upload.wikimedia.org/wikipedia/commons/c/c7/Windows_logo_-_2012.png");
        GamePlatform steamMac = new GamePlatform(steam, "steamMac", "https://cdn-icons-png.flaticon.com/512/2/2235.png");
        GamePlatform originWindows = new GamePlatform(origin, "originWindows", "https://upload.wikimedia.org/wikipedia/commons/c/c7/Windows_logo_-_2012.png");

        gamePlatformService.addGamePlatform(steamWindows);
        gamePlatformService.addGamePlatform(steamMac);
        gamePlatformService.addGamePlatform(originWindows);

        gameService.addGame(new Game("The Witcher 3", "RPG", "2015-05-19", "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png", "9.5", steamWindows));
        gameService.addGame(new Game("Cyberpunk 2077", "Action RPG", "2020-12-10", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4aoKYUD1glMmC0V-fbZpXNx69cfJBaUa3w&s", "7.0", steamWindows));
        gameService.addGame(new Game("Portal 2", "Puzzle-platformer", "2011-04-18", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXKjc-Gr0Ir-ar8uK4JCWa5GsuoQ1nsdQOWw&s", "9.0", steamMac));
        gameService.addGame(new Game("FIFA 21", "Sports", "2020-10-09", "https://upload.wikimedia.org/wikipedia/en/b/bb/FIFA_21_Standard_Edition_Cover.jpg", "8.0", originWindows));
        gameService.addGame(new Game("The Sims 4", "Simulation", "2014-09-02", "https://upload.wikimedia.org/wikipedia/ru/5/5e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_The_Sims_4.jpeg", "7.5", originWindows));
    }
}
