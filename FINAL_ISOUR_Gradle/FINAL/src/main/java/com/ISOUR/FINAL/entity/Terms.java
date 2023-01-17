package com.ISOUR.FINAL.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="Terms")
public class Terms {
    @Id
    private Long id_num;
    private String term1;
    private String term2;
    private String term3;
    private LocalDateTime registrationTime;
}
