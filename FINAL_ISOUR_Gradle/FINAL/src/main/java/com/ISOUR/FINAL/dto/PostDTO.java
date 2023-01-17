package com.ISOUR.FINAL.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.*;

@Getter
@Setter
public class PostDTO {
    private Long postNum;
    private String postSenderId;
    private String postSender;
    private String content;
    private LocalDateTime postTime;
}
