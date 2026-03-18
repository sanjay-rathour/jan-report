package CIRP.Backend.JanReport.controller;

import CIRP.Backend.JanReport.dto.IssueListResponse;
import CIRP.Backend.JanReport.dto.IssuesRequest;
import CIRP.Backend.JanReport.service.IssuesService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssuesController {

    private final IssuesService issuesService;

    //creating
    @PostMapping
    public ResponseEntity<?> addIssue(@RequestPart("request") String request,
                                      @RequestPart("file") MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            IssuesRequest issuesRequest = objectMapper.readValue(request, IssuesRequest.class);
            issuesRequest.setImageFile(file);
            return ResponseEntity.status(HttpStatus.CREATED).body(issuesService.addIssue(issuesRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //retreieving
    @GetMapping
    public ResponseEntity<?>  listIssues(){
        try{
            return ResponseEntity.ok(issuesService.getAllIssues());
        }catch(Exception e){
            return ResponseEntity.ok(new IssueListResponse(false, null));
        }
    }

    //deleting
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeIssue(@PathVariable String id) {
        try {
            Boolean removed = issuesService.removeIssue(id);
            if(removed) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        }catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
