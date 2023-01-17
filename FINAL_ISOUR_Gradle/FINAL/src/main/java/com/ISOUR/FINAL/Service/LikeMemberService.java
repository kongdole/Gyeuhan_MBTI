package com.ISOUR.FINAL.Service;

import com.ISOUR.FINAL.entity.LikeMember;
import com.ISOUR.FINAL.entity.MemberInfo;
import com.ISOUR.FINAL.repository.LikeMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class LikeMemberService {
    private final LikeMemberRepository likeMemberRepository;
    // 좋아요
    public Integer LikeMember(Long user_Id_num, Long Like_Id_num) {
        log.warn("★★★★★★★★★좋아요 서비스★★★★★★★★★");

        LikeMember isTrue = likeMemberRepository.findByUserIdxAndLikeUserIdx(user_Id_num, Like_Id_num);
        if (isTrue == null) {
            LikeMember likeMember = new LikeMember();
            likeMember.setUserIdx(user_Id_num);
            likeMember.setLikeUserIdx(Like_Id_num);
            likeMember.setLike_time(LocalDateTime.now().withNano(0));

            LikeMember result = likeMemberRepository.save(likeMember);
            log.warn(result.toString());

            return 1;
        } else {
            // 좋아요 취소
            log.warn("★★★★★★★★★좋아요 취소 서비스★★★★★★★★★");

           Integer result = likeMemberRepository.deleteByUserIdxAndLikeUserIdx(user_Id_num, Like_Id_num);
            if (result > 0) {
                return 2;
            }
            return 0;
        }
    }
}
