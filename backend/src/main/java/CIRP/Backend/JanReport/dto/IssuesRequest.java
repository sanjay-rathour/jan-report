package CIRP.Backend.JanReport.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IssuesRequest {
    private String title;
    private String desc;
    private MultipartFile imageFile;
}
