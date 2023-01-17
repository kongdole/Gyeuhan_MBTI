import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";

import "./Chat.css";
import { 
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion, 
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "./User";
import ChatForm from "./ChatForm";
import ChatMsg from "./ChatMsg";
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const ChatHome = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const cookies = new Cookies();
  // ▼ 로그인 안 되어 있으면 로그인 페이지로
  const localId = cookies.get('rememberId');
  const id = localId;
  const navigate = useNavigate();
  
  const user1 = id;
  
  useEffect(() => {
    async function showChatMember() {
      let myFriends;
      const docRef = doc(db, "users", user1);
      const usersRef = collection(db, "users");

      const docSnap = await getDoc(docRef);
      myFriends = docSnap.data().friends;

      if(myFriends.length === 0) {
        alert("채팅 가능한 친구가 없어요.")
        navigate("/matching");
      } else {
        const q = query(usersRef, where("id", "in", myFriends));

        onSnapshot(q, (querySnapshot) => {
          let chatMember = [];
          querySnapshot.forEach((doc) => {
            chatMember.push(doc.data());
          });
          setUsers(chatMember);
        });
      }
    }
    showChatMember();
  },[]);


  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.id;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.id;
    
    // 형식 ▶message => id => chat => add doc
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    const friendRef = doc(db, "users", user2)
    await updateDoc(friendRef, {
      friends: arrayUnion(user1)
    });

    setText("");
  }

  

  return (
    <div className="Container">
      <div className="chat_container">

        <div className="users_container">
          <div className="chat_title">목 록</div>
          {users.map((user) => (
            <User
              key={user.id}
              user={user}
              selectUser={selectUser}
              user1={user1} // 나
              chat={chat}
            />
          ))}
        </div>
        
        {chat ? (
        <div className="messages_container">
          <div className="messages-box">
            {msgs.length
              ? msgs.map((msg, i) => (
                <ChatMsg key={i} msg={msg} user1={user1}/>
                ))
              : null}
          </div>
          <div className="message-send">
            <ChatForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </div>
        </div>
        )
        : (
        <h3 className="no_conv">대화하고싶은 상대의 이름을 클릭하세요</h3>
        )}
    </div>
  </div>
  );
};

export default ChatHome;