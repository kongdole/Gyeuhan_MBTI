import { useState } from 'react';
import '../3. SignUp/Terms.css';
import styled from 'styled-components';


const SignUpContainer = styled.div`
  position: relative;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  text-align: center;
  flex-direction: column;
  max-width: 1180px;
  font-family: "Jalnan";
  background-color: white;
`
const Terms = (props) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [termsList, setTermsList] = useState([
    {termNum: 1, title: "[필수] 아이셔계정 약관"},
    {termNum: 2, title: "[선택] 프로모션 정보 수신 동의(선택)"}
  ]);

  function AllCheck() {
    return(
      <p>
        전체 동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.
        <br />
        선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
      </p>
    );
  }

  /* 
  체크박스 전체 선택 */ 
  const handleAllCheck = (checked) => {
    if(checked) {
      const termNumArray = []; // termNum 을 담을 빈 배열(termNumArray) 생성
      termsList.forEach((e) => termNumArray.push(e.termNum)); // termsList 를 하나씩 돌면서 termNumArray termNum 추가
      setCheckedItems(termNumArray);
    }
    else {
      setCheckedItems([]); // checkedItems 를 빈 배열로 상태 업데이트
    }
  }

  /* 
  체크박스 단일 선택 */ 
  const handleSingleCheck = (checked, num) => {
    if (checked) {
      setCheckedItems(fix => [...fix, num]); // 체크된 약관 번호를 checkedItems 배열에 추가
    } else {
      setCheckedItems(checkedItems.filter((e) => e !== num)); // 체크된 약관 번호를 checkedItems 배열에서 삭제
    }
  };

  /*
  동의하고 가입하기 */
  const onClickAgree = () => {

    if(checkedItems.includes(1)) {
    } else {
      alert("1번에 무조건 동의해야합니다.");
    }
  }

  return(
    <SignUpContainer>
      <div>
        <input type="checkbox" id="checkbox-check_all"
          onChange={(e) => handleAllCheck(e.target.checked)}
          checked={termsList.length === checkedItems.length ? true : false} />
        <label htmlFor="checkbox-check_all">모두 동의합니다.</label>
      </div>
      <AllCheck />
      {termsList?.map(ball => (
        <div>
          <input type="checkbox" id="checkbox-check_single"
            onChange={(e) => handleSingleCheck(e.target.checked, ball.termNum)}
            checked={checkedItems.includes(ball.termNum) ? true : false} />
          <label htmlFor="checkbox-check_single">{ball.title}</label>
        </div>
      ))}

      <button type="button" onClick={onClickAgree}>동의하고 가입하기</button> 
    </SignUpContainer>
  );
}

export default Terms;