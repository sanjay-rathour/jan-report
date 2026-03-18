package CIRP.Backend.JanReport.dto;

import CIRP.Backend.JanReport.document.Issues;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IssueListResponse {
    private boolean success;
    private List<Issues> issues;
}
