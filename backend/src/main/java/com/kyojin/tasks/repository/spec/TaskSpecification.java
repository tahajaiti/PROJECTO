package com.kyojin.tasks.repository.spec;

import com.kyojin.tasks.dto.filter.TaskFilterDTO;
import com.kyojin.tasks.entity.Task;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class TaskSpecification {

    private TaskSpecification() {

    }

    public static Specification<Task> getSpec(Long projectId, Long userId, TaskFilterDTO filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // check authorization
            predicates.add(cb.equal(root.get("project").get("id"), projectId));
            predicates.add(cb.equal(root.get("project").get("user").get("id"), userId));

            if (filter != null) {

                // status
                if (filter.getCompleted() != null) {
                    predicates.add(cb.equal(root.get("completed"), filter.getCompleted()));
                }

                // search
                if (StringUtils.hasText(filter.getQuery())) {
                    String searchPattern = "%" + filter.getQuery().toLowerCase() + "%";
                    Predicate titleLike = cb.like(cb.lower(root.get("title")), searchPattern);
                    Predicate descLike = cb.like(cb.lower(root.get("description")), searchPattern);
                    predicates.add(cb.or(titleLike, descLike));
                }

                // due date range
                if (filter.getDueDateFrom() != null) {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("dueDate"), filter.getDueDateFrom()));
                }

                if (filter.getDueDateTo() != null) {
                    predicates.add(cb.lessThanOrEqualTo(root.get("dueDate"), filter.getDueDateTo()));
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}