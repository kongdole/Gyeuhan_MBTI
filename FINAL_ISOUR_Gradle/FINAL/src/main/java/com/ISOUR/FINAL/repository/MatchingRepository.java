package com.ISOUR.FINAL.repository;

//import com.ISOUR.Entity.MBTI;

import com.ISOUR.FINAL.entity.MemberInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchingRepository extends JpaRepository<MemberInfo, Long> {

    List<MemberInfo> findById(String id);

    // ***************  MySQL 버전 *****************
//    @Query(value = "SELECT " +
////            " im.id_num AS user_id_num," +
//            "im.nick_name AS user_nick, " +
//            "im.mbti AS user_mbti, " +
//            "im.introduce AS user_introduce," +
//            "im2.nick_name AS mat_nick," +
//            "im2.mbti AS mat_mbti," +
//            "im2.introduce AS mat_introduce," +
//            "m.order_mbti AS order_mbti " +
//            "FROM i_member AS im " +
//            "JOIN MBTI AS m " +
//            "ON im.mbti = m.user_mbti " +
//            "JOIN i_member as im2 " +
//            "ON im2.mbti = m.mat_mbti " +
//            "WHERE im.id = :id " +
//            "order BY m.order_mbti", nativeQuery = true)
//    List<MatDTO> findById(@PathVariable("id") String id);

    // ***************  ORACLE 버전 *****************
//    @Query(value = "SELECT \n" +
//            "\tim.ID_NUM AS user_id_num,\n" +
//            "\tim.NICK_NAME AS user_nick, \n" +
//            "\tim.MBTI AS user_mbti, \n" +
//            "\tim.INTRODUCE AS user_introduce,\n" +
//            "\tim2.NICK_NAME AS mat_nick,\n" +
//            "\tim2.MBTI AS mat_mbti,\n" +
//            "\tim2.INTRODUCE AS mat_introduce,\n" +
//            "\tm.ORDER_MBTI AS order_mbti\n" +
//            "FROM I_MEMBER im\n" +
//            "\tINNER JOIN MBTI m \n" +
//            "\t\tON im.MBTI = m.USER_MBTI\n" +
//            "\tINNER JOIN I_MEMBER im2 \n" +
//            "\t\tON im2.MBTI = m.MAT_MBTI\n" +
//            "WHERE im.ID = :id \n" +
//            "ORDER BY m.ORDER_MBTI", nativeQuery = true)
//    List<MatDTO> MatDTOById(@PathVariable("id") String id);

//    MemberInfo findById_num(String id);
}
