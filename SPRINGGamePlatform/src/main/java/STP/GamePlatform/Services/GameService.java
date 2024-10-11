package STP.GamePlatform.Services;

import STP.GamePlatform.Entities.Game;
import STP.GamePlatform.Entities.GamePlatform;
import STP.GamePlatform.Repos.GamePlatformRepository;
import STP.GamePlatform.Repos.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final GamePlatformRepository gamePlatformRepository;

    @Autowired
    public GameService(GameRepository gameRepository, GamePlatformRepository gamePlatformRepository) {
        this.gameRepository = gameRepository;
        this.gamePlatformRepository = gamePlatformRepository;
    }

    public Game addGameToGamePlatform(Long gamePlatformId, Game game) {
        GamePlatform gamePlatform = gamePlatformRepository.findById(gamePlatformId)
                .orElseThrow(() -> new NoSuchElementException("GamePlatform not found with id " + gamePlatformId));

        game.setGamePlatform(gamePlatform);
        return gameRepository.save(game);
    }

    public Game addGame(Game game) {
        return gameRepository.save(game);
    }

    public Game updateGame(Long gameId, Game updatedGame) {
        Game existingGame = gameRepository.findById(gameId)
                .orElseThrow(() -> new NoSuchElementException("Game not found with id " + gameId));

        existingGame.setName(updatedGame.getName());
        existingGame.setGenre(updatedGame.getGenre());
        existingGame.setReleaseDate(updatedGame.getReleaseDate());
        existingGame.setCover(updatedGame.getCover());
        existingGame.setScore(updatedGame.getScore());

        return gameRepository.save(existingGame);
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public void deleteGame(Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new NoSuchElementException("Game not found with id " + gameId));
        gameRepository.delete(game);
    }

    public List<Game> getGamesByGamePlatformId(Long gamePlatformId) {
        GamePlatform gamePlatform = gamePlatformRepository.findById(gamePlatformId)
                .orElseThrow(() -> new NoSuchElementException("GamePlatform not found with id " + gamePlatformId));
        return gameRepository.findByGamePlatform(gamePlatform);
    }
}
