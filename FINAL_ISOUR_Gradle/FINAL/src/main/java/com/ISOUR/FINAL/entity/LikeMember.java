package com.ISOUR.FINAL.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="Like_Member")
public class LikeMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long like_num;
    @Column(name = "user_idx")
    private Long userIdx;
    @Column(name = "like_user_idx")
    private Long likeUserIdx;
    private LocalDateTime like_time;
}
