import React, { useState } from "react";
import './EmailModal.css';

const FindInfoModal = ({ open,  onHide, modalName }) => {

    const onClickClose = () => {
        onHide();
    }

    let id = modalName;
    const seq = "*";
   

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>

            {open ? (<section>
                <header>
                    {"조회된 아이디"}
                    <button className="close" onClick={onClickClose}>
                        &times;
                    </button>
                </header>
                <main>
                    <form>
                        <div className="modal-findId">
                            <label>조회된 아이디</label>
                            <p></p>
                            <div>{<b>{id}</b>}</div>
                        </div>
                    </form>
                </main>
                <footer>
                    <button className="close" onClick={onClickClose}>
                        close
                    </button>
                </footer>
            </section>
            ) : null}
        </div>
    )
}
//<div>{<b>{id.substring(0,2)+seq+seq+id.substring(3)}*/</b>}</div>
// 가운데 아이디 두글자 가리기 위한 코드

export default FindInfoModal;
