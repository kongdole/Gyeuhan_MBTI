package com.ISOUR.FINAL.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class KakaoDTO {
    private Long id_num;
    private Long kakaoId;
    private String kakaoToken; // 일단 토큰으로 해봄.
    private String kakaoEmail;
    private LocalDateTime kakaoCreateTime;
}