package com.ISOUR.FINAL.repository;


import com.ISOUR.FINAL.entity.Postbox;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
@Slf4j
class PostboxRepositoryTest {
    @Autowired
    PostboxRepository postboxRepository;

    @Test
    @DisplayName("쪽지 보내기 테스트")
    public void sendPostTest() {
        LocalDateTime currentTime = LocalDateTime.now();
        String id = "skfk2";
        String receiverId = "skfk1";
        for(int i = 1; i <= 11; i++) {
            Postbox postbox = new Postbox();
            postbox.setPostSender(id);
            postbox.setPostReceiver(receiverId);
            postbox.setContent("쪽지 보내기 테스트 - " + i);
            postbox.setPostTime(currentTime.withNano(0));
            postboxRepository.save(postbox);
        }
    }
}