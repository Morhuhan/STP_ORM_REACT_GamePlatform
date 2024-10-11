package STP.GamePlatform.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Entity
@Table(name = "platform")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Platform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String characteristic;

    private String urlImage;

    @OneToMany(mappedBy = "platform")
    @JsonManagedReference
    private List<GamePlatform> gamePlatforms;

    public Platform(String name, String characteristic, String img) {
        this.name = name;
        this.characteristic = characteristic;
        this.urlImage = img;
    }
}



