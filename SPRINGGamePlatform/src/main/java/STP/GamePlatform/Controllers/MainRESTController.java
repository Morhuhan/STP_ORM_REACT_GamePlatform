package STP.GamePlatform.Controllers;

import STP.GamePlatform.Entities.Game;
import STP.GamePlatform.Entities.GamePlatform;
import STP.GamePlatform.Entities.Platform;
import STP.GamePlatform.Services.GamePlatformService;
import STP.GamePlatform.Services.GameService;
import STP.GamePlatform.Services.PlatformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainRESTController {

    private final PlatformService platformService;
    private final GamePlatformService gamePlatformService;
    private final GameService gameService;

    @Autowired
    public MainRESTController(PlatformService platformService, GamePlatformService gamePlatformService, GameService gameService) {
        this.platformService = platformService;
        this.gamePlatformService = gamePlatformService;
        this.gameService = gameService;
    }

    // === Эндпойнты для платформ ===
    @GetMapping("/platforms")
    public List<Platform> getAllPlatforms() {
        return platformService.getAllPlatforms();
    }

    @PostMapping("/platforms/add")
    public ResponseEntity<Platform> addPlatform(@RequestBody Platform platform) {
        Platform savedPlatform = platformService.addPlatform(platform);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlatform);
    }

    @GetMapping("/platforms/{id}")
    public ResponseEntity<Platform> getPlatformById(@PathVariable Long id) {
        Platform platform = platformService.getPlatformById(id);
        return ResponseEntity.ok(platform);
    }

    @PostMapping("/platforms/{id}/edit")
    public ResponseEntity<Platform> updatePlatform(
            @PathVariable Long id,
            @RequestBody Platform platform) {
        Platform updatedPlatform = platformService.updatePlatform(id, platform);
        return ResponseEntity.ok(updatedPlatform);
    }

    @PostMapping("/platforms/{id}/delete")
    public ResponseEntity<Void> deletePlatform(@PathVariable Long id) {
        platformService.deletePlatform(id);
        return ResponseEntity.noContent().build();
    }

    // === Эндпойнты для игровых платформ ===
    @GetMapping("/platform/{platformId}/gamePlatforms")
    public List<GamePlatform> getGamePlatformsByPlatformId(@PathVariable Long platformId) {
        return gamePlatformService.getGamePlatformsByPlatformId(platformId);
    }

    @PostMapping("/platform/{platformId}/gamePlatforms/add")
    public ResponseEntity<GamePlatform> addGamePlatform(@PathVariable Long platformId, @RequestBody GamePlatform gamePlatform) {
        GamePlatform savedGamePlatform = gamePlatformService.addGamePlatformByPlatformID(platformId, gamePlatform);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGamePlatform);
    }

    @PostMapping("/gamePlatforms/{gamePlatformId}/edit")
    public ResponseEntity<GamePlatform> updateGamePlatform(
            @PathVariable Long gamePlatformId,
            @RequestBody GamePlatform gamePlatform) {
        GamePlatform updatedGamePlatform = gamePlatformService.updateGamePlatform(gamePlatformId, gamePlatform);
        return ResponseEntity.ok(updatedGamePlatform);
    }

    @PostMapping("/gamePlatforms/{gamePlatformId}/delete")
    public ResponseEntity<Void> deleteGamePlatform(@PathVariable Long gamePlatformId) {
        gamePlatformService.deleteGamePlatform(gamePlatformId);
        return ResponseEntity.noContent().build();
    }

    // === Эндпойнты для игр ===
    @GetMapping("/gamePlatform/{gamePlatformId}/games")
    public List<Game> getGamesByGamePlatformId(@PathVariable Long gamePlatformId) {
        return gameService.getGamesByGamePlatformId(gamePlatformId);
    }

    @PostMapping("/gamePlatform/{gamePlatformId}/games/add")
    public ResponseEntity<Game> addGameToGamePlatform(@PathVariable Long gamePlatformId, @RequestBody Game game) {
        Game savedGame = gameService.addGameToGamePlatform(gamePlatformId, game);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGame);
    }

    @PostMapping("/games/{gameId}/edit")
    public ResponseEntity<Game> updateGame(@PathVariable Long gameId, @RequestBody Game game) {
        Game updatedGame = gameService.updateGame(gameId, game);
        return ResponseEntity.ok(updatedGame);
    }

    @GetMapping("/games")
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @PostMapping("/games/{gameId}/delete")
    public ResponseEntity<Void> deleteGame(@PathVariable Long gameId) {
        gameService.deleteGame(gameId);
        return ResponseEntity.noContent().build();
    }

}
