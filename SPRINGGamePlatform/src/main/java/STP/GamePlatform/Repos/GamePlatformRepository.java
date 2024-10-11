package STP.GamePlatform.Repos;

import STP.GamePlatform.Entities.GamePlatform;
import STP.GamePlatform.Entities.Platform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GamePlatformRepository extends JpaRepository<GamePlatform, Long> {
    List<GamePlatform> findByPlatform(Platform platform);
}