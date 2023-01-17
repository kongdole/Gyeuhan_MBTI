package com.ISOUR.FINAL.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Chat")
public class GChat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatNum;
    private String content;
    private String face;
    private String nickname;
    private String id;
    private LocalDateTime chatTime;
}
