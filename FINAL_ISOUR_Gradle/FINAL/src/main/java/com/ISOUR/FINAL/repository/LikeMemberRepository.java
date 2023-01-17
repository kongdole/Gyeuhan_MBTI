package com.ISOUR.FINAL.repository;

import com.ISOUR.FINAL.entity.LikeMember;
import org.springframework.data.jpa.repository.JpaRepository;
import javax.transaction.Transactional;

@Transactional
public interface LikeMemberRepository extends JpaRepository<LikeMember, Long> {
    Integer deleteByUserIdxAndLikeUserIdx(Long user_Id_num, Long Like_Id_num);
    LikeMember findByUserIdxAndLikeUserIdx(Long user_Id_num, Long Like_Id_num);

}
