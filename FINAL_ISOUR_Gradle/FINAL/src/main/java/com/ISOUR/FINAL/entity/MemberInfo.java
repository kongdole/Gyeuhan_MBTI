package com.ISOUR.FINAL.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name="I_MEMBER")
@DynamicUpdate
public class MemberInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_num")
    private Long idNum;
    @Column(unique = true)
    private String id;
//    @Column(insertable=false, updatable=false)
//    @Column(updatable = false)
    private String pwd;
    private String name;
    @Column(updatable = false)
    private String birth;
    @Column(unique = true)
    private String nickname;
    @Column(unique = true)
    private String email;
    private String gender;
    private String region1;
    private String region2;
    private String mbti;
    private String introduce;
    private String face;
    private String coin;
    private String maxPage;
    @Column(updatable = false)
    private LocalDateTime registrationDate;
}
