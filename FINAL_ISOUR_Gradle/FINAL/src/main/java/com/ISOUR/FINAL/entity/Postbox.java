package com.ISOUR.FINAL.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.*;

@Data
@Entity
@Table(name="Postbox")
public class Postbox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postNum;
    private String postReceiver;
    private String postSender;
    private String content;
    @Column(updatable = false)
    private LocalDateTime postTime;
}
