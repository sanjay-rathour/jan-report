package CIRP.Backend.JanReport.repository;

import CIRP.Backend.JanReport.document.Issues;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IssuesRepository extends MongoRepository<Issues, String> {
}
