package org.sefglobal.core.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.sefglobal.core.util.Status;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Setter(AccessLevel.PUBLIC)
@Getter(AccessLevel.PUBLIC)
public class Event extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String name;

    @NotNull
    private String link;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date time;

    @NotNull
    @Column(length = 10)
    private String status = Status.ACTIVE.toString();

    public String getLink() {
        return link;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
