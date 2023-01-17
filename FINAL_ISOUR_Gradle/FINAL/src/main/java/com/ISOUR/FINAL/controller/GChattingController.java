package com.ISOUR.FINAL.controller;


import com.ISOUR.FINAL.Service.GChatService;
import com.ISOUR.FINAL.dto.GChatDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@Slf4j
public class GChattingController {
    private com.ISOUR.FINAL.Service.GChatService GChatService;

    public GChattingController(GChatService GChatService) {
        this.GChatService = GChatService;
    }
    @PutMapping("/Chat")
    public ResponseEntity<Boolean> sendPost(@RequestBody Map<String, String> chatData) {
        log.warn("★★★★★★★★★쪽지 보내기 Controller★★★★★★★★★");

        String getContent = chatData.get("content");
        String getNickname = chatData.get("nickname");
        String getId = chatData.get("id");
        String getFace = chatData.get("face");

        log.info(getContent);

        boolean isTrue = GChatService.sendPost(getContent,getId,getNickname,getFace);
        if(isTrue) {
            log.warn(">" + isTrue + " : 채팅성공 ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">" + isTrue + " : 채팅 실패 ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }
    @PostMapping("/Chat")
    public ResponseEntity<List<GChatDTO>> chatList() {
        log.warn("★★★★★★★★★전체 회원 조회 Controller★★★★★★★★★");
        List<GChatDTO> list = GChatService.getChatList();
        log.warn(">>>>>>>>>>" + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/chat/addMember")
    public ResponseEntity<Boolean> chatAddMember(@RequestBody Map<String, String> chatList) {
        log.warn("★★★★★★★★★ 채팅 친구 추가 Controller★★★★★★★★★");
        String userId = chatList.get("MyId");
        String chatMemberId = chatList.get("chatMemberId");

        boolean chatlist = GChatService.chatAddMember(userId, chatMemberId);

        if(chatlist) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }
}
