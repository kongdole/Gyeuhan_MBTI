package com.ISOUR.FINAL.repository;

import com.ISOUR.FINAL.entity.MemberInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MemberRepository extends JpaRepository<MemberInfo, Long> {


    List<MemberInfo> findByIdAndPwd(String id, String pwd);
    MemberInfo findById(String id);
    MemberInfo findByIdNum(Long id_num);
    MemberInfo findByEmail(String email);
    MemberInfo findByNickname(String nickname);
    MemberInfo findByIdAndEmailAndBirth(String id, String email, String birth);

    MemberInfo findByNameAndEmailAndBirth(String name, String email, String birth);

}
