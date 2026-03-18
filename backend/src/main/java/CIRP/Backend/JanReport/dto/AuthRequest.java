package CIRP.Backend.JanReport.dto;

import lombok.Data;

@Data
public class AuthRequest {

    private String email;
    private String password;
}
