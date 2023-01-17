package com.ISOUR.FINAL.repository;


import com.ISOUR.FINAL.entity.GChat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GChatRepository extends JpaRepository<GChat, Long> {
    List<GChat> findAll();
}
