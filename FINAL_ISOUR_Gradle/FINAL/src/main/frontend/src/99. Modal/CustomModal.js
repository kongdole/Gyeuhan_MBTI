import React from "react";
import './CustomModal.css';

function CustomModal(props) {
  const { state, changeState } = props;

  const onClickClose = (e) => {
    changeState();
  }

  if(state.success) setTimeout(() => { changeState() }, 2000);

  return (
    <div className={state.open ? "CustomModal_wrapper active" : "CustomModal_wrapper"}>
      <div className="Shadow close_btn"></div>
      
      <div className="CustomModal-Box">

      {/* 성공(Success) */}
      {state.open ?
        <div className={state.success ? "modal_item s_modal active" : "modal_item s_modal"}>
          <div className="close close_btn" onClick={onClickClose}>
            <span className="material-symbols-outlined" >close</span>
          </div>
          <div className="modal_body">
            <div className="s_icon">
              <span className="material-symbols-outlined">check</span>
            </div>
            <div className="s_text">
              <h1>SUCCESS</h1>
              <p>{state.successMsg}</p>
            </div>
          </div>
          <div className="s_button" onClick={onClickClose}>
            <button className="success_btn">닫기</button>
          </div>
        </div>
      : null }

      {/* 실패(Error) */}
      {state.open ?
        <div className={state.error ? "modal_item e_modal active" : "modal_item e_modal"}>
          <div className="close close_btn" onClick={onClickClose} >
            <span className="material-symbols-outlined" name="error">close</span>
          </div>
          <div className="modal_body">
            <div className="s_icon">
              <span className="material-symbols-outlined">question_mark</span>
            </div>
            <div className="s_text">
              <h1>ERROR</h1>
              <p>{state.errorMsg}</p>
            </div>
          </div>
          <div className="s_button" onClick={onClickClose} >
            <button className="error_btn">닫 기</button>
          </div>
        </div>
      : null }
    </div>
  </div>
  )
}

export default CustomModal