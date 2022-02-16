package org.sefglobal.core.repository;

import org.sefglobal.core.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findByIdAndStatus(long id, String status);
    boolean existsByIdAndStatus(long id, String status);
}
