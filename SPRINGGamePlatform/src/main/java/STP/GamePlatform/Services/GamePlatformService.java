package STP.GamePlatform.Services;

import STP.GamePlatform.Entities.Game;
import STP.GamePlatform.Entities.GamePlatform;
import STP.GamePlatform.Entities.Platform;
import STP.GamePlatform.Repos.GamePlatformRepository;
import STP.GamePlatform.Repos.GameRepository;
import STP.GamePlatform.Repos.PlatformRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class GamePlatformService {

    private final GamePlatformRepository gamePlatformRepository;
    private final PlatformRepository platformRepository;
    private final GameRepository gameRepository;

    @Autowired
    public GamePlatformService(GamePlatformRepository gamePlatformRepository, PlatformRepository platformRepository, GameRepository gameRepository) {
        this.gamePlatformRepository = gamePlatformRepository;
        this.platformRepository = platformRepository;
        this.gameRepository = gameRepository;
    }

    public GamePlatform addGamePlatformByPlatformID(Long platformId, GamePlatform gamePlatform) {
        Platform platform = platformRepository.findById(platformId)
                .orElseThrow(() -> new NoSuchElementException("Platform not found with id " + platformId));
        gamePlatform.setPlatform(platform);
        return gamePlatformRepository.save(gamePlatform);
    }

    public List<GamePlatform> getGamePlatformsByPlatformId(Long platformId) {
        Platform platform = platformRepository.findById(platformId)
                .orElseThrow(() -> new NoSuchElementException("Platform not found with id " + platformId));
        return gamePlatformRepository.findByPlatform(platform);
    }

    public GamePlatform updateGamePlatform(Long gamePlatformId, GamePlatform updatedGamePlatform) {
        GamePlatform existingGamePlatform = gamePlatformRepository.findById(gamePlatformId)
                .orElseThrow(() -> new NoSuchElementException("GamePlatform not found with id " + gamePlatformId));

        existingGamePlatform.setName(updatedGamePlatform.getName());

        return gamePlatformRepository.save(existingGamePlatform);
    }

    public GamePlatform addGamePlatform(GamePlatform gamePlatform) {
        return gamePlatformRepository.save(gamePlatform);
    }

    @Transactional
    public void deleteGamePlatform(Long gamePlatformId) {
        gamePlatformRepository.deleteById(gamePlatformId); 
    }

}
