package com.ISOUR.FINAL.controller;

import com.ISOUR.FINAL.Service.LikeMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@Slf4j
@RequiredArgsConstructor
public class LikeMemberController {
    private final LikeMemberService likeMemberService;

    @PostMapping("/like")
    public ResponseEntity<Integer> LikeMember(@RequestBody Map<String, String> LikeData) {
        log.warn("★★★★★★★★★ 좋아요 Controller★★★★★★★★★");

        Long user_Id_num = Long.valueOf(LikeData.get("id_num"));
        Long Like_Id_num = Long.valueOf(LikeData.get("mat_id_num"));

        log.warn(String.valueOf(user_Id_num));
        log.warn(String.valueOf(Like_Id_num));

        Integer isSave = likeMemberService.LikeMember(user_Id_num, Like_Id_num);
        // 좋아요: 1
        // 좋아요 취소: 2
        // 아무것도 수행 안됨: 0
        if (isSave == 1) {
            log.warn("LikeMember 테이블 DB 저장 " + isSave);
            return new ResponseEntity<>(1, HttpStatus.OK);
        } else if (isSave == 2) {
            log.warn("LikeMember 테이블 DB 삭제 " + isSave);
            return new ResponseEntity<>(2, HttpStatus.OK);
        }
        return new ResponseEntity<>(0, HttpStatus.OK);
    }
}
