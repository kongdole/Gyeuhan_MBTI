import { useState, useEffect } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

/*
<Pagination/> 컴포넌트는 <Posts/> 컴포넌트로부터 총 게시물 수(total)와 페이지 당 게시물 수(limit) 그리고 현재 페이지 번호(page)를 prop으로 받는데요.
위에서 배운 페이지네이션 알고리즘에 따라 필요한 페이지의 개수(numPages)를 계산한 후 이 페이지의 개수만큼 루프를 돌면서 페이지 번호 버튼을 출력합니다.
페이지 번호 버튼에 클릭 이벤트가 발생하면 prop으로 넘어온 setPage() 함수를 호출하여 부모인 <Posts/> 컴포넌트의 page 상태가 변경되도록 합니다. 그러면 <Posts/> 컴포넌트는 새로운 페이지 번호에 해당하는 게시물 범위를 계산하여 다시 화면을 렌터링할 것입니다.
*/

function Pagination(props) {
  const { total, limit, page, setPage } = props;
  const pageLimit = 5; // 페이지바에 보여줄 최대 페이지 수
  const [pageList, setPageList] =  useState([]);

  let offset = (page - 1); // 각 페이지별 첫 게시물의 위치 계산
  let totalPages = 1; // 전체 페이지 수(쪽지가 없어도 보이게 고정값 1)
  if(total !== 0) { // 쪽지가 있으면 전체 페이지 수 계산
    totalPages = Math.ceil(total / limit); // 전체 페이지 수 ex) 13 / 10 => 2
  }
  /* 
  최초 통신(useEffect) */
  useEffect(() => {
    let temp_pageList = [];
    for(let i = 0 ; i < totalPages; i++) {
      temp_pageList.push(i+1);
    }
    setPageList(temp_pageList);
  }, []);

  let endPage = offset + pageLimit; // 페이지바에 보여줄 마지막 페이지
  if(endPage > totalPages) {
    endPage = totalPages;
  }
  
  let firstPage = endPage - pageLimit;
  if(firstPage < 0) firstPage = 0;

  /* ( < ) 이전 버튼 */
  const onClickBeforeIcon =() => {
    if(page === 1) return;
    setPage(page - 1);
  }

  /* ( > ) 다음 버튼 */
  const onClickNextIcon = () => {
    if(page === totalPages) return;
    setPage(page + 1);
  }

  return (
    <div className="Postbox-Pagination">
      <span className="move before" onClick={onClickBeforeIcon}>
        <NavigateBeforeIcon />
      </span>

      {pageList.slice(firstPage, endPage).map(ball => {
        return (
          <span className="move">
            <li onClick={() => setPage(ball)}
              aria-current={page === ball ? "page" : null}
              className={page === ball && "selected_page"}
            >
              {ball}
            </li>
          </span>
        )
      })}
      <span className="move next" onClick={onClickNextIcon}>
        <NavigateNextIcon />
      </span>
    </div>
  );
}

export default Pagination;
// arr.fill() : 배열에다가 채운다. 채울 값을, n 번 인덱스부터, n길이까지
// arr.map() : x => x*2
// Math.ceil() 함수는 주어진 숫자보다 크거나 같은 숫자 중 가장 작은 숫자를 integer 로 반환합니다.