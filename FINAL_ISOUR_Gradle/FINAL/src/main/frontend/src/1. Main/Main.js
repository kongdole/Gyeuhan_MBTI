import { Link } from "react-router-dom";
import '../1. Main/Main.css';
import '../images/아이셔용.png';
import { motion } from "framer-motion"
import { ScrollContainer, ScrollPage, batch, Fade,MoveOut, Sticky, Animator,FadeIn,ZoomIn,Move,StickyIn} from "react-scroll-motion"

function Main () {
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
    const FadeUp = batch(Fade(), Move(), Sticky());
    return(
        <div className="Main_Container"> 
            <div className="Main_title">
                <ScrollContainer>
                             
                    <ScrollPage>
                        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -300))}>
                            <span className="Main-FirstInfo" style={{ fontSize: "40px" }}>Spacebar or 스트롤을 내려주세요</span>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -300))}>
                            <span style={{ fontSize: "30px" }}>MBTISOUR</span>
                        </Animator>
                    </ScrollPage>
                    
                    <ScrollPage>
                        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -300))}>
                            <span style={{ fontSize: "30px" }}> <strong><p>인간들은 성격이 존재합니다.</p></strong></span>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -300))}>
                            <span className="Page3" style={{ fontSize: "30px" }}> <strong><p>안맞는 사람들이 있을거고</p></strong></span>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -300))}>
                            <span className="Page3" style={{ fontSize: "30px" }}> <strong><p>또 잘맞는 사람이 있습니다.</p></strong></span>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage>
                        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -300))}>
                            <span className="Page3" style={{ fontSize: "30px" }}> <strong><p>내 성격이 궁금하신가요?</p></strong></span>
                        </Animator>
                    </ScrollPage>
                    
                    <ScrollPage>
                        <Animator animation={FadeUp}>
                            <span style={{ fontSize: "40px" }}><motion.div
                                className="box"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}>  
                                <button className="Main-box-button2">START</button>
                                <a href="/login">
                                    <div className="loading"/>
                                    </a>
                                </motion.div></span>
                        </Animator>
                    </ScrollPage>
                </ScrollContainer>
            </div>
        </div>
    )
}
    export default Main;
    