package com.ISOUR.FINAL.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Data
@DynamicUpdate
@Table(name="kakao_table")
public class KakaoLogin {
    private Long id_num;
    @Id
    private Long kakaoId;   // 카카오 유저 고유 ID?
//    private String kakaoIdToken; // 일단 토큰으로 해봄.
//    @Column(unique = true)
//    private String k_nickname;
    @Column(unique = true)
    private String kakaoEmail;
    private LocalDateTime kakaoCreateTime;
}


//    private String access_token;
//    private String token_type;
//    private String refresh_token;
//    private String expires_in;
//    private String refresh_token_expires_in;
