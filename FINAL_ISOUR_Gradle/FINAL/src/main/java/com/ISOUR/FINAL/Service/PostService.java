package com.ISOUR.FINAL.Service;

import com.ISOUR.FINAL.dto.PostDTO;
import com.ISOUR.FINAL.entity.MemberInfo;
import com.ISOUR.FINAL.entity.Postbox;
import com.ISOUR.FINAL.repository.MemberRepository;
import com.ISOUR.FINAL.repository.PostboxRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {
    private final PostboxRepository postboxRepository;
    private final MemberRepository memberRepository;

    /* 쪽지함 조회 서비스 */
    public List<PostDTO> getPostList(String id) {
        log.warn("★★★★★★★★★쪽지함 조회 서비스★★★★★★★★★");
        log.warn("받는 사람(id) : " + id);

        List<PostDTO> postDTOS = new ArrayList<>();
        List<Postbox> postboxList = postboxRepository.findByPostReceiver(id);
        log.warn(postboxList.toString());
        log.warn(">> 쪽지함 조회 서비스 로 돌아왔습니다.");

        for(Postbox e : postboxList) {
            PostDTO postDTO = new PostDTO();
            postDTO.setPostNum(e.getPostNum());
            postDTO.setPostSenderId(e.getPostSender());

            String getSender = e.getPostSender();
            MemberInfo senderInfo = memberRepository.findById(getSender);
//            log.warn("senderInfo : " + senderInfo);
            if(senderInfo != null) postDTO.setPostSender(senderInfo.getNickname());
            else postDTO.setPostSender("탈퇴한 회원");

            postDTO.setContent(e.getContent());
            postDTO.setPostTime(e.getPostTime());

            postDTOS.add(postDTO);
        }

        return postDTOS;
    }

    /* 쪽지 보내기 서비스 */
    public boolean sendPost(String id, String receiverId, String content) {
        log.warn("★★★★★★★★★쪽지 보내기 서비스★★★★★★★★★");
        log.warn("보내는 사람(id) : " + id);
        log.warn("받는 사람(receiverId) : " + receiverId);
        log.warn("내용(content) : " + content);

        LocalDateTime currentTime = LocalDateTime.now();
        Postbox postbox = new Postbox();
        postbox.setPostSender(id);
        postbox.setPostReceiver(receiverId);
        postbox.setContent(content);
        postbox.setPostTime(LocalDateTime.now().withNano(0));

        Postbox result = postboxRepository.save(postbox);
        log.warn(result.toString());

        return true;
    }

    /* 쪽지 삭제 서비스 */
    public boolean deleteMember(ArrayList<Long> postNumArray) {
        log.warn("★★★★★★★★★쪽지 삭제 서비스★★★★★★★★★");
        log.warn("삭제할 쪽지 번호(postNum) : " + postNumArray);

        List<Postbox> postDeleteList = new ArrayList<>();
        for(int i = 0; i < postNumArray.size(); i++) {
            long deleteNum = postNumArray.get(i);
            Postbox postbox = postboxRepository.findByPostNum(deleteNum);
            postDeleteList.add(postbox);

            log.warn("postDeleteList 에 추가 : \n>>" + postDeleteList.toString());
        }

        
        if(postDeleteList.size() > 0) {
            log.warn(">> 삭제 : " + postDeleteList);
            postboxRepository.deleteAll(postDeleteList);
            log.warn(">> 쪽지 삭제 Controller 로 돌아갑니다.");
            return true;
        } else return false;
    }
}
