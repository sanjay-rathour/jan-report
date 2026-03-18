package CIRP.Backend.JanReport.service;

import CIRP.Backend.JanReport.document.Issues;
import CIRP.Backend.JanReport.dto.IssueListResponse;
import CIRP.Backend.JanReport.dto.IssuesRequest;
import CIRP.Backend.JanReport.repository.IssuesRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class IssuesService {
    private final IssuesRepository issuesRepository;
    private final Cloudinary cloudinary;
    
    public Issues addIssue(IssuesRequest request) throws IOException {
       Map<String, Object> imageUploadResult = cloudinary.uploader().upload(request.getImageFile().getBytes(), ObjectUtils.asMap("resource_type", "image"));
       Issues newIssue = Issues.builder()
               .title(request.getTitle())
               .desc(request.getDesc())
               .imageUrl(imageUploadResult.get("secure_url").toString())
               .build();
        return issuesRepository.save(newIssue);
    }

    public IssueListResponse getAllIssues() {
        return new IssueListResponse(true, issuesRepository.findAll());
    }

    public Boolean removeIssue(String id) {
        Issues existingIssue = issuesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
        issuesRepository.delete(existingIssue);
        return true;
    }
}
