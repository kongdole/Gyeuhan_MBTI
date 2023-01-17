package com.ISOUR.FINAL.controller;

import com.ISOUR.FINAL.Service.EmailService;
import com.ISOUR.FINAL.Service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import static com.ISOUR.FINAL.Service.EmailServiceImpl.createKey;
import static com.ISOUR.FINAL.Service.EmailServiceImpl.ePw;

@CrossOrigin(value = "http://localhost:3000")
@Slf4j
@RestController
@RequestMapping("/service/*")
public class EmailConfirmController {
    @Autowired
    EmailService service;
    private final MemberService memberService;

    public EmailConfirmController(MemberService memberService) {
        this.memberService = memberService;
    }

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @PostMapping("/mail")
    public void isMemberCheck(@RequestBody Map<String, String> emailData) throws Exception {
        String getEmailId = emailData.get("id");
        logger.info("post emailConfirm");
        System.out.println("전달 받은 이메일 : " + getEmailId);
        service.sendSimpleMessage(getEmailId);
    }

    int cnt = 0;

    @PostMapping("/verifyCode")
//    @ResponseBody
    public Integer verifyCode(@RequestBody Map<String, String> emailCode){
        logger.info("Post verifyCode");
        Integer result=0;
        String getEmailCode = emailCode.get("code");
        System.out.println("code : "+getEmailCode);
        System.out.println("code match : "+ ePw.equals(getEmailCode));

        if(ePw.equals(getEmailCode)) {

            result =1;
            cnt=cnt+1;
            System.out.println(cnt);
            System.out.println(cnt%5);
            if(cnt%50==0) {
                ePw = createKey();
            }
        }
        return result;
    }


    @PostMapping("/isEmailCheck")
    public ResponseEntity<Boolean> IsEmailCheck(@RequestBody Map<String, String> memberData) {
        log.warn("★★★★★★★★★이메일 중복확인 Controller★★★★★★★★★");

        String getEmail = memberData.get("email");
        log.warn("중복확인할 이메일 주소(email : " + getEmail);

        boolean isTrue = memberService.isEmailCheck(getEmail);
        if(isTrue) log.warn("중복확인할 이메일(email) boolean 값 : " + isTrue);

        if(isTrue) {
            log.warn(">>" + isTrue + " : 사용할 수 없는 이메일 입니다. ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">>" + isTrue + " : 사용할 수 있는 이메일입니다. ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }



}
