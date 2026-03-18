package CIRP.Backend.JanReport.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "issues")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Issues {
    @Id
    @JsonProperty("_id")
    private String id;

    private String title;
    private String desc;
    private String imageUrl;
}
