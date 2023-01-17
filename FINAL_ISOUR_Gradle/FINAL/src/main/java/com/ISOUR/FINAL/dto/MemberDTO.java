package com.ISOUR.FINAL.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Setter
public class MemberDTO {
    @Column(name="id_num")
    private Long idNum;
    private String id;
    private String pwd;
    private String name;
    private String nickname;
    private String email;
    private String birth;
    private String gender;
    private String region1;
    private String region2;
    private String mbti;
    private String introduce;
    private String face;
    private String coin;
    private String maxPage;
    private LocalDateTime registrationDate;
}
