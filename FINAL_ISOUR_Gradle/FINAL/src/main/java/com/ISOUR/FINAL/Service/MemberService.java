package com.ISOUR.FINAL.Service;

import com.ISOUR.FINAL.dto.MemberDTO;
import com.ISOUR.FINAL.dto.PaymentDTO;
import com.ISOUR.FINAL.entity.MemberInfo;
import com.ISOUR.FINAL.entity.Payment;
import com.ISOUR.FINAL.entity.Terms;
import com.ISOUR.FINAL.repository.MemberRepository;
import com.ISOUR.FINAL.repository.PaymentRepository;
import com.ISOUR.FINAL.repository.TermsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final TermsRepository termsRepository;
    private final PaymentRepository paymentRepository;


    /* 아이디 중복 체크(회원가입 여부 확인) 서비스 */
    public boolean isMemberCheck(String id) {
        log.warn("★★★★★★★★★아이디 중복체크 서비스★★★★★★★★★");
        log.warn("입력한 아이디(id) : " + id);

        MemberInfo memberInfo = memberRepository.findById(id);
        if(memberInfo != null) return true;
        else return false;
    }

    /* 닉네임 중복 체크 서비스 */
    public boolean isNicknameCheck(String nickname) {
        log.warn("★★★★★★★★★닉네임 중복 체크 서비스★★★★★★★★★");
        log.warn("입력한 닉네임(id) : " + nickname);

        MemberInfo memberInfo = memberRepository.findByNickname(nickname);
        if(memberInfo != null) return true;
        else return false;
    }

    /* 회원가입 서비스 */
    public boolean signUpMember(String name, String id, String pwd, String nickname, String email, String birth, String gender, String region1, String region2, String introduce) {
        log.warn("★★★★★★★★★회원가입 서비스★★★★★★★★★");

        MemberInfo memberInfo = new MemberInfo();
        memberInfo.setName(name);
        memberInfo.setId(id);
        memberInfo.setPwd(pwd);
        memberInfo.setNickname(nickname);
        memberInfo.setEmail(email);
        memberInfo.setBirth(birth);
        memberInfo.setGender(gender);
        memberInfo.setRegion1(region1);
        memberInfo.setRegion2(region2);
        memberInfo.setIntroduce(introduce);
        memberInfo.setRegistrationDate(LocalDateTime.now().withNano(0));

        MemberInfo result = memberRepository.save(memberInfo);
        log.warn(result.toString());

        return true;
    }

    /* 약관 동의 서비스 */
    public boolean agreeTerms(String id, String check_term1, String check_term2, String check_term3) {
        log.warn("★★★★★★★★★약관 동의 서비스★★★★★★★★★");
        log.warn("id : " + id);
        log.warn("필수 동의 약관(check_term1) : " + check_term1);
        log.warn("선택 동의 약관(check_term2) : " + check_term2);
        log.warn("선택 동의 약관(check_term2) : " + check_term3);

        MemberInfo memberInfo = memberRepository.findById(id);
        log.warn(memberInfo.toString());

        Terms terms = new Terms();
        terms.setId_num(memberInfo.getIdNum());
        terms.setTerm1(check_term1);
        terms.setTerm2(check_term2);
        terms.setTerm3(check_term3);
        terms.setRegistrationTime(LocalDateTime.now());

        Terms result = termsRepository.save(terms);
        log.warn(result.toString());

        return true;
    }

    // 회원번호 찾기
    public Long findMemberId(String id) {
        Long id_num = memberRepository.findById(id).getIdNum();

        return id_num;
    }

    /* 로그인 서비스 */
    public boolean loginMember(String id, String pwd) {
        log.warn("★★★★★★★★★로그인 서비스★★★★★★★★★");
        log.warn("입력한 아이디(id) : " + id);
        log.warn("입력한 비밀번호(pwd) : " + pwd);

        List<MemberInfo> memberInfoList = memberRepository.findByIdAndPwd(id, pwd);
        for(MemberInfo e : memberInfoList) {
            return true;
        }
        return false;
    }

    /* MBTI 검사 결과 저장 서비스 */
    public boolean saveMBTI(String mbti, String id) {
        log.warn("★★★★★★★★★MBTI 검사 결과 저장 서비스★★★★★★★★★");
        log.warn("MBTI 검사 결과(mbti) : " + mbti);
        log.warn("아이디(id) : " + id);

        MemberInfo memberInfo = memberRepository.findById(id);
        memberInfo.setIdNum(memberInfo.getIdNum());
        memberInfo.setName(memberInfo.getName());
        memberInfo.setId(memberInfo.getId());
        memberInfo.setPwd(memberInfo.getPwd());
        memberInfo.setBirth(memberInfo.getBirth());
        memberInfo.setGender(memberInfo.getGender());
        memberInfo.setRegion1(memberInfo.getRegion1());
        memberInfo.setRegion2(memberInfo.getRegion2());
        memberInfo.setMbti(mbti);

        memberRepository.save(memberInfo);

        return true;
    }

    /* 프로필 이미지 변경 서비스 */
    public boolean saveFace(String id, String url) {
        log.warn("★★★★★★★★★프로필 이미지 변경 서비스★★★★★★★★★");
        log.warn("아이디(id) : " + id);
        log.warn("저장할 URL : " + url);

        MemberInfo memberInfo = memberRepository.findById(id);
        memberInfo.setIdNum(memberInfo.getIdNum());
        memberInfo.setId(memberInfo.getId());
        memberInfo.setPwd(memberInfo.getPwd());
        memberInfo.setName(memberInfo.getName());
        memberInfo.setBirth(memberInfo.getBirth());
        memberInfo.setNickname(memberInfo.getNickname());
        memberInfo.setEmail(memberInfo.getEmail());
        memberInfo.setGender(memberInfo.getGender());
        memberInfo.setRegion1(memberInfo.getRegion1());
        memberInfo.setRegion2(memberInfo.getRegion2());
        memberInfo.setMbti(memberInfo.getMbti());
        memberInfo.setIntroduce(memberInfo.getIntroduce());
        memberInfo.setFace(url);

        memberRepository.save(memberInfo);

        return true;
    }

    /* 회원정보 수정 서비스 */
    public boolean updateMember(String id, String pwd, String nickname, String introduce, String email, String region1, String region2) {
        log.warn("★★★★★★★★★회원정보 수정 서비스★★★★★★★★★");
        log.warn("아이디(id) : " + id);
        log.warn("변경한 비밀번호(pwd) : " + pwd);
        log.warn("변경한 닉네임(nickname) : " + nickname);
        log.warn("변경한 자기소개(introduce) : " + introduce);
        log.warn("변경한 이메일(email) : " + email);
        log.warn("변경한 시도(region1) : " + region1);
        log.warn("변경한 시구군(region2) : " + region2);

        MemberInfo memberInfo = memberRepository.findById(id);
        memberInfo.setIdNum(memberInfo.getIdNum());
        memberInfo.setPwd(pwd);
        memberInfo.setNickname(nickname);
        memberInfo.setIntroduce(introduce);
        memberInfo.setEmail(email);
        memberInfo.setRegion1(region1);
        memberInfo.setRegion2(region2);
        memberRepository.save(memberInfo);

        return true;
    }

    /* 회원탈퇴 서비스 */
    public boolean deleteMember(String id, String pwd) {
        log.warn("★★★★★★★★★회원탈퇴 서비스★★★★★★★★★");
        log.warn("아이디(id) : " + id);
        log.warn("입력한 비밀번호(pwd) : " + pwd);

        List<MemberInfo> memberInfoList = memberRepository.findByIdAndPwd(id, pwd);
        log.warn(memberInfoList.toString());
        if(memberInfoList.size() == 1) {
            memberRepository.deleteAll(memberInfoList);
            return true;
        } else return false;
    }

    /* 개별 회원 조회 서비스 */
    public MemberDTO getMemberInfo(String id) {
        log.warn("★★★★★★★★★개별 회원 조회 서비스★★★★★★★★★");
        log.warn("조회할 아이디(id) : " + id);
        MemberInfo memberInfo = memberRepository.findById(id);
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setIdNum(memberInfo.getIdNum());
        memberDTO.setName(memberInfo.getName());
        memberDTO.setId(memberInfo.getId());
        memberDTO.setPwd(memberInfo.getPwd());
        memberDTO.setNickname(memberInfo.getNickname());
        memberDTO.setBirth(memberInfo.getBirth());
        memberDTO.setEmail(memberInfo.getEmail());
        memberDTO.setGender(memberInfo.getGender());
        memberDTO.setRegion1(memberInfo.getRegion1());
        memberDTO.setRegion2(memberInfo.getRegion2());
        memberDTO.setMbti(memberInfo.getMbti());
        memberDTO.setIntroduce(memberInfo.getIntroduce());
        memberDTO.setFace(memberInfo.getFace());
        memberDTO.setCoin(memberInfo.getCoin());
        if(memberInfo.getMaxPage()==null){
            memberInfo.setMaxPage("1");
        }
        memberDTO.setMaxPage(memberInfo.getMaxPage());
        memberDTO.setRegistrationDate(memberInfo.getRegistrationDate());

        return memberDTO;
    }

    /* 카카오 로그인 회원 조회 서비스 */
    public MemberDTO KakaoMemberInfo(Long id_num) {
        log.warn("★★★★★★★★★카카오 회원 조회 서비스★★★★★★★★★");
        log.warn("카카오 아이디_num(id_num) : " + id_num);
        MemberInfo memberInfo = memberRepository.findByIdNum(id_num);
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setIdNum(memberInfo.getIdNum());
        memberDTO.setName(memberInfo.getName());
        memberDTO.setId(memberInfo.getId());
        memberDTO.setPwd(memberInfo.getPwd());
        memberDTO.setNickname(memberInfo.getNickname());
        memberDTO.setBirth(memberInfo.getBirth());
        memberDTO.setEmail(memberInfo.getEmail());
        memberDTO.setGender(memberInfo.getGender());
        memberDTO.setRegion1(memberInfo.getRegion1());
        memberDTO.setRegion2(memberInfo.getRegion2());
        memberDTO.setMbti(memberInfo.getMbti());
        memberDTO.setIntroduce(memberInfo.getIntroduce());
        memberDTO.setFace(memberInfo.getFace());

        return memberDTO;
    }


    /* 비밀번호 찾기 조회 서비스 */
    public MemberDTO findPwd(String id, String email, String birth) {
        log.warn("★★★★★★★★★개별 회원 조회 서비스★★★★★★★★★");
        log.warn("조회할 아이디(id) : " + id);
        log.warn("조회할 이메일(email) : " + email);
        log.warn("조회할 생년월일(birth) : " + birth);
        MemberInfo memberInfo = memberRepository.findByIdAndEmailAndBirth(id, email, birth);
        if(memberInfo ==null) {
            return null;
        }else {


            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setIdNum(memberInfo.getIdNum());
            memberDTO.setName(memberInfo.getName());
            memberDTO.setId(memberInfo.getId());
            memberDTO.setPwd(memberInfo.getPwd());
            memberDTO.setNickname(memberInfo.getNickname());
            memberDTO.setBirth(memberInfo.getBirth());
            memberDTO.setEmail(memberInfo.getEmail());
            memberDTO.setGender(memberInfo.getGender());
            memberDTO.setRegion1(memberInfo.getRegion1());
            memberDTO.setRegion2(memberInfo.getRegion2());
            memberDTO.setMbti(memberInfo.getMbti());
            memberDTO.setIntroduce(memberInfo.getIntroduce());
            memberDTO.setFace(memberInfo.getFace());


            log.warn("memberDTO: " + memberDTO.getBirth());
            return memberDTO;
        }
    }

    /* 아이디 찾기 조회 서비스 */
    public MemberDTO findId(String name, String email, String birth) {
        log.warn("★★★★★★★★★로그인 서비스★★★★★★★★★");
        log.warn("입력한 이름(name) : " + name);
        log.warn("입력한 이메일(email) : " + email);
        log.warn("입력한 생년월일(birth) : " + birth);

        MemberInfo memberInfo = memberRepository.findByNameAndEmailAndBirth(name, email, birth);
        if(memberInfo==null){
            return null;
        }else{
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(memberInfo.getId());
        return memberDTO;
        }
    }





    /* 전체 회원 조회 서비스 */
    public List<MemberDTO> getMemberList() {
        log.warn("★★★★★★★★★전체 회원 조회 서비스★★★★★★★★★");

        List<MemberDTO> memberDTOS = new ArrayList<>();
        List<MemberInfo> memberInfoList = memberRepository.findAll();

        for(MemberInfo e : memberInfoList) {
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setName(e.getName());
            memberDTO.setId(e.getId());
            memberDTO.setPwd(e.getPwd());
            memberDTO.setBirth(e.getBirth());
            memberDTO.setRegion1(e.getRegion1());
            memberDTO.setRegion2(e.getRegion2());
            memberDTO.setMbti(e.getMbti());

            memberDTOS.add(memberDTO);
        }
        return memberDTOS;
    }

    /*이메일 중복 확인 서비스*/
    public boolean isEmailCheck(String email) {
        log.warn("★★★★★★★★★이메일 중복체크 서비스★★★★★★★★★");
        log.warn("입력한 이메일(email) :" + email);

        MemberInfo memberInfo = memberRepository.findByEmail(email);
        if(memberInfo != null) return true;
        else return false;
    }


    /* 구글 이메일 조회 서비스 */
    public MemberDTO findInfoByGoogle(String email) {
        log.warn("★★★★★★★★★구글 회원 이메일 조회 서비스★★★★★★★★★");
        log.warn("입력한 이메일(email) : " + email);


        MemberInfo memberInfo = memberRepository.findByEmail(email);
        if (memberInfo==null) {
            return null;
        } else {
            MemberDTO memberDTO = new MemberDTO();
            memberDTO.setId(memberInfo.getId());
            log.warn("대체 뭘 담고 있니?" + memberInfo);
            return memberDTO;
        }
    }
    /* 코인 조회 서비스*/
    public MemberDTO updateCoin(String id, String coin) {
        log.warn("★★★★★★★★★회원정보 수정 서비스★★★★★★★★★");
        log.warn("아이디(id) : " + id);
        log.warn("사용하고 남은 coin(coin) : " + coin);

        MemberDTO memberDTO = new MemberDTO();
        MemberInfo memberInfo = memberRepository.findById(id);
        memberInfo.setId(memberInfo.getId());
        memberInfo.setCoin(coin);
        memberRepository.save(memberInfo);
        memberDTO.setCoin(memberInfo.getCoin());

        return memberDTO;
    }

    /* 매칭관련 맥스페이지 업데이트 서비스*/
    public MemberDTO updateMaxPage(String id, String coin,String maxPage) {
        log.warn("★★★★★★★★★맥스페이지 및 코인 수정 서비스★★★★★★★★★");
        log.warn("아이디(id) : " + id);
        log.warn("사용하고 남은 coin(coin) : " + coin);
        log.warn("사용하고 남은 maxPage(maxPage) : " + maxPage);

        MemberDTO memberDTO = new MemberDTO();
        MemberInfo memberInfo = memberRepository.findById(id);
        memberInfo.setId(memberInfo.getId());
        memberInfo.setCoin(coin);
        memberInfo.setMaxPage(maxPage);
        memberRepository.save(memberInfo);
        memberDTO.setCoin(memberInfo.getCoin());
        memberDTO.setMaxPage(maxPage);

        return memberDTO;
    }

    /*카카오 페이 인포*/
    public MemberDTO getKakaoPayInfo(String getId, String getPdName, String getQuantity,String getCreatedAt ,String getPaymentMethod ,String getAmountTotal){
        log.warn("★★★★★★★★★ 카카오 페이 정보 이용 서비스★★★★★★★★★");
        log.warn("아이디(id) : " + getId);
        MemberDTO memberDTO = new MemberDTO();
        PaymentDTO paymentDTO = new PaymentDTO();

        MemberInfo memberInfo = memberRepository.findById(getId);

        if(memberInfo.getCoin()==null) {
            memberInfo.setCoin("0");
        }
        log.warn("( memberInfo.getCoin()) : " + memberInfo.getCoin());

        log.warn("숫자로 바꿔서 더하고 다시 스트링으로 : " + String.valueOf(Integer.parseInt(getQuantity)+Integer.parseInt(memberInfo.getCoin())));

        /*아이디와 코인정보를 받아서 코인을 더해서 디비에 저장*/
        memberInfo.setId(memberInfo.getId());
        memberInfo.setCoin(String.valueOf(Integer.parseInt(getQuantity)+Integer.parseInt(memberInfo.getCoin())));
        memberRepository.save(memberInfo);

        log.warn("숫자로 바꿔서 더하고 다시 스트링으로 : " + memberInfo.getCoin());

        Payment payment = new Payment();

        payment.setIdNum(memberInfo.getIdNum());
        payment.setId(memberInfo.getId());
        payment.setPdName(getPdName);
        payment.setCreatedAt(getCreatedAt);
        payment.setPaymentMethod(getPaymentMethod);
        payment.setAmountTotal(getAmountTotal);

        paymentRepository.save(payment);


        /*디비에 저장된 기존의 코인과 결제한 코인의 합을 클라이언트로 반환함.*/
        memberDTO.setCoin(String.valueOf(Integer.parseInt(getQuantity)+Integer.parseInt(memberInfo.getCoin())));


        return memberDTO;

    }
}