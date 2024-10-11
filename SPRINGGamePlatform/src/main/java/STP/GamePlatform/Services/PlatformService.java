package STP.GamePlatform.Services;

import STP.GamePlatform.Entities.Platform;
import STP.GamePlatform.Repos.PlatformRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PlatformService {

    private final PlatformRepository platformRepository;

    @Autowired
    public PlatformService(PlatformRepository platformRepository) {
        this.platformRepository = platformRepository;
    }

    public List<Platform> getAllPlatforms() {
        return platformRepository.findAll();
    }

    public Platform addPlatform(Platform platform) {
        return platformRepository.save(platform);
    }

    public Platform getPlatformById(Long id) {
        return platformRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Platform not found with id " + id));
    }

    public Platform updatePlatform(Long id, Platform platform) {
        if (!platformRepository.existsById(id)) {
            throw new NoSuchElementException("Platform not found with id " + id);
        }
        platform.setId(id);
        return platformRepository.save(platform);
    }

    public void deletePlatform(Long id) {
        if (!platformRepository.existsById(id)) {
            throw new NoSuchElementException("Platform not found with id " + id);
        }
        platformRepository.deleteById(id);
    }
}


