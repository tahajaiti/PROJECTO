package com.kyojin.tasks.repository.spec;

import com.kyojin.tasks.dto.request.ProjectFilterDTO;
import com.kyojin.tasks.entity.Project;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class ProjectSpecification {

    private ProjectSpecification() {

    }

    public static Specification<Project> getSpec(ProjectFilterDTO filter, Long userId) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (userId != null) {
                predicates.add(criteriaBuilder.equal(root.get("user").get("id"), userId));
            }

            if (filter != null && StringUtils.hasText(filter.getQuery())) {
                String searchPattern = "%" + filter.getQuery().toLowerCase() + "%";
                Predicate titleLike = criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), searchPattern);
                Predicate descLike = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), searchPattern);

                predicates.add(criteriaBuilder.or(titleLike, descLike));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}