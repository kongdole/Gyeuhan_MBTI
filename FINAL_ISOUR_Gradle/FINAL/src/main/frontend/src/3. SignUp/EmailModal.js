import React, { useState } from "react";
import TeamAPI from '../0. API/TeamAPI';
import './EmailModal.css';

const EmailModal = ({ open, show, onHide, modalName, modalContent }) => {
    const [code, setCode] = useState("");

    const onChangeCode = e => {
        setCode(e.target.value);
    };

    const onClickClose = () => {
        onHide();
    }

    const onClickReply = async (e) => {
        e.preventDefault();
        if (code !== null) {
            const emailConfirm = await TeamAPI.emailCode(code);
            alert("코드 보내기 성공!!");
            if (emailConfirm.data === 1) {
                alert("인증이 완료되었습니다.")
                modalContent();
                onHide();
            } else {
                alert("인증코드가 일치하지 않습니다. 다시 입력해주세요.");
                setCode("");
            }
        } else {
            alert("코드정보를 넣어주세요..^^");
        }
    }

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>

            {open ? (<section>
                <header>
                    {"이메일 인증"}
                    <button className="close" onClick={onClickClose}>
                        &times;
                    </button>
                </header>
                <main>
                    <form>
                        <div>
                            <label>인증받을 이메일</label>
                            <input placeholder={modalName} disabled></input>
                        </div>
                        <div>
                            <label>인증 코드 입력 창</label>
                            <input placeholder="인증 코드를 입력해주세요." value={code} onChange={onChangeCode} required ></input>
                        </div>
                    </form>
                </main>
                <footer>
                    <button onClick={onClickReply}>
                        인증하기
                    </button>
                    <button className="close" onClick={onClickClose}>
                        close
                    </button>
                </footer>
            </section>
            ) : null}
        </div>
    )
}

export default EmailModal;
