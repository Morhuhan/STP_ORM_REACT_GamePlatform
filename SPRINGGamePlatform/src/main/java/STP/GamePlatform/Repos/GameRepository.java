package STP.GamePlatform.Repos;

import STP.GamePlatform.Entities.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import STP.GamePlatform.Entities.Game;
import STP.GamePlatform.Entities.GamePlatform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByGamePlatform(GamePlatform gamePlatform);  // Метод для поиска игр по игровой платформе
}
