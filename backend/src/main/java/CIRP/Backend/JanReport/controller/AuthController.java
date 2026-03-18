package CIRP.Backend.JanReport.controller;

import CIRP.Backend.JanReport.document.User;
import CIRP.Backend.JanReport.dto.AuthRequest;
import CIRP.Backend.JanReport.dto.AuthResponse;
import CIRP.Backend.JanReport.dto.RegisterRequest;
import CIRP.Backend.JanReport.dto.UserResponse;
import CIRP.Backend.JanReport.service.UserInfoService;
import CIRP.Backend.JanReport.service.UserService;
import CIRP.Backend.JanReport.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final UserInfoService userInfoService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
//           authentication
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

//            load user
            UserDetails userDetails = userInfoService.loadUserByUsername(request.getEmail());
            User existingUser = userService.findByEmail(request.getEmail());

            // generate token
            String token = jwtUtil.generateToken(userDetails, existingUser.getRole().name());

            return ResponseEntity.ok(new AuthResponse(token, request.getEmail(), existingUser.getRole().name()));

        }catch(BadCredentialsException e) {
            return ResponseEntity.badRequest().body("Email/Password is incorrect");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            UserResponse response = userService.registerUser(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
