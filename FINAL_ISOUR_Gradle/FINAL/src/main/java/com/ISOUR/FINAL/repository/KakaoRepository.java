package com.ISOUR.FINAL.repository;

import com.ISOUR.FINAL.entity.KakaoLogin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KakaoRepository extends JpaRepository<KakaoLogin, Long> {

    KakaoLogin findBykakaoEmail(String email);
    KakaoLogin findBykakaoId(Long kakaoid);
}
