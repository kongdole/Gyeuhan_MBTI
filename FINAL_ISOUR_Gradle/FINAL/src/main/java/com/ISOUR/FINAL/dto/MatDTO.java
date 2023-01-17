package com.ISOUR.FINAL.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
//@NoArgsConstructor      // 매개변수를 받지 않는 생성자를 만들어 줌.
@AllArgsConstructor     // 생성자 자동 생성
//@RequiredArgsConstructor    // 필요한 멤버만 매개변수로 받는 생성자를 만들어 줌.
public class MatDTO {
    // 오라클 버전
//    private BigDecimal user_id_num;
//    private String user_nick;
//    private String user_mbti;
//    private String user_introduce;
//    private BigDecimal mat_id_num;
//    private String mat_nick;
//    private String mat_mbti;
//    private String mat_introduce;
//    private BigDecimal order_mbti;
//    private BigDecimal r_NUM;

    // MySql 버전
    private BigInteger user_id_num;
    private String user_mbti;
    private BigInteger mat_id_num;
    private String mat_id;
    private String mat_face;
    private String mat_nick;
    private String mat_mbti;
    private String mat_introduce;
    private Integer order_mbti;
    private BigInteger cnt;
    private String like_member_idx;
    private BigInteger r_NUM;

}
