package STP.GamePlatform.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Table(name = "game")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String genre;
    private String releaseDate;

    private String cover;

    private String score;

    @ManyToOne
    @JoinColumn(name = "game_platform_id")
    @JsonBackReference
    private GamePlatform gamePlatform;

    @Autowired
    public Game(String name, String genre, String releaseDate, String cover, String score, GamePlatform gamePlatform) {
        this.name = name;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.cover = cover;
        this.score = score;
        this.gamePlatform = gamePlatform;
    }
}
