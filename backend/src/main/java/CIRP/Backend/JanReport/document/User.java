package CIRP.Backend.JanReport.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User {

    public enum Role {
        USER, ADMIN, MlaMp
    }

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;
    private String password;

    // ADDITION: You need a field to store the role in the database
    private Role role;
}
