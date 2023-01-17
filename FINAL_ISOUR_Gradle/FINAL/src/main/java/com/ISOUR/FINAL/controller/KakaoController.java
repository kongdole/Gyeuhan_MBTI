package com.ISOUR.FINAL.controller;

import com.ISOUR.FINAL.Service.KakaoLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@CrossOrigin(value = "http://localhost:3000")
@RestController
@Slf4j
@RequiredArgsConstructor
public class KakaoController {
    private final KakaoLoginService kakaoLoginService;

    // 카카오 회원가입
    @PostMapping("/login/kakao")
    public ResponseEntity<Map<String, String>> kakaoSignup(@RequestBody Map<String, String> tokenData) {
        String access_token = tokenData.get("access_token");
        log.warn("토크으으으으으으ㅡㅇ은!!!!! (access_token) : " + access_token);
        Map<String, String> result = new HashMap<>();
        Map<String, String> userInfo = kakaoLoginService.getUserInfo(access_token);
        String k_email = userInfo.get("kakaoEmail");
        log.warn(" >>>>>>>  email 찍혀라!!" + k_email);

        if (k_email != null) {
            Map<String, String> isres = (Map<String, String>) kakaoLogin(userInfo);
            log.warn("> 카톡 회원 정보 받아오기 -> 성공 ");
            log.warn("> userInfo -> " + userInfo);

            if ( isres == null ) {
                // 카카오톡 로그인 정보 없음 -> 회원정보 넘겨줌
                log.warn(">>>>> 222");
                return new ResponseEntity<>(userInfo, HttpStatus.OK);
            } else {
                // 카카오톡 로그인 정보 있음 -> 성공(code: 201)
//                result.put("CODE", "777");
                log.warn(">>>>> 201");
                log.warn("> isres -> " + isres);
                return new ResponseEntity<>(isres, HttpStatus.CREATED);
            }
        } else {
            log.warn("> 카톡 회원 정보 받아오기 -> 실패 ");
            // 카카오톡 정보 받아오기 실패(code: 999)
            result.put("CODE", "999");
            log.warn(">>>>> 999");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    // 카카오 테이블 저장
    public Map<String, String> kakaoLogin(Map<String, String> userInfo) {
        String k_email = userInfo.get("kakaoEmail");
//        Long id = Long.valueOf(userInfo.get("id"));

        // 가입 여부 확인
        Map<String, String> kakaoDTO = kakaoLoginService.kakaoLogin(k_email);
        
        if (kakaoDTO != null) {
            log.warn("> 카톡 가입 확인 -> 로그인 성공 ");
            return kakaoDTO;
        } else {
            log.warn("> 카톡 가입 확인 -> 가입정보 없음");
//            boolean isSignup = kakaoLoginService.kakaoSignup(k_email, id);
            return null;
        }
    }

}



