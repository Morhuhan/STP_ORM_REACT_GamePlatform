package STP.GamePlatform.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Entity
@Table(name = "gamePlatform")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GamePlatform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "platform_id", nullable = false)
    @JsonBackReference
    private Platform platform;

    private String name;

    private String urlImage;

    @OneToMany(mappedBy = "gamePlatform")
    @JsonManagedReference
    private List<Game> games;

    @Autowired
    public GamePlatform(Platform platform, String name, String urlImage) {
        this.platform = platform;
        this.name = name;
        this.urlImage = urlImage;
    }
}



