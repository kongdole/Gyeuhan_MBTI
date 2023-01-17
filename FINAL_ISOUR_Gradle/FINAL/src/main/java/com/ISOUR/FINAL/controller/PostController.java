package com.ISOUR.FINAL.controller;

import com.ISOUR.FINAL.Service.PostService;
import com.ISOUR.FINAL.dto.PostDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@Slf4j
public class PostController {
    // Service(서비스) 로직 연결
    private PostService postService;
    public PostController(PostService postService) {
        this.postService = postService;
    }

    /* 쪽지함 조회 */
    @PostMapping("/GetPostbox")
    public ResponseEntity<List<PostDTO>> postList(@RequestBody Map<String, String> resultData) {
        log.warn("★★★★★★★★★쪽지함 조회 Controller★★★★★★★★★");

        log.warn("resultData : " + resultData);

        String getId = resultData.get("id");
        log.warn(getId + " 의 쪽지함 조회");

        List<PostDTO> list = postService.getPostList(getId);
        log.warn(">> 쪽지함 조회 Controller 로 돌아왔습니다.");

        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    /* 쪽지 보내기 */
    @PostMapping("/SendPost")
    public ResponseEntity<Boolean> sendMessage(@RequestBody Map<String, String> PostData) {
        log.warn("★★★★★★★★★쪽지 보내기 Controller★★★★★★★★★");

        String getId = PostData.get("id");
        String getReceiverId = PostData.get("receiverId");
        String getContent = PostData.get("content");
        log.info(getId);
        log.info(getReceiverId);
        log.info(getContent);

        log.info("\n\nPost Controller Call !!!!");

        boolean isTrue = postService.sendPost(getId, getReceiverId, getContent);

        if(isTrue) return new ResponseEntity<>(true, HttpStatus.OK);
        else return new ResponseEntity<>(false, HttpStatus.OK);
    }

    /* 쪽지 삭제 */
    @PostMapping("/DeletePost")
    public ResponseEntity<Boolean> postDelete(@RequestBody ArrayList<Long> PostData) {
        log.warn("★★★★★★★★★쪽지 삭제 Controller★★★★★★★★★");
        log.warn("삭제할 쪽지 번호 리스트(PostData) : " + PostData);
        log.warn("PostData 의 type 확인 : " + PostData.getClass());

        boolean isTrue = postService.deleteMember(PostData);

        if(isTrue) {
            log.warn(">" + isTrue + " : 쪽지 삭제 성공 ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">" + isTrue + " : 쪽지 삭제 실패 ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }
}
