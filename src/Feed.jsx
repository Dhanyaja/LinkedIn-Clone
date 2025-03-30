import './Feed.css';
import React, { useState, useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import InputOption from './InputOption';
import Post from './Post';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { serverTimestamp, addDoc } from 'firebase/firestore';
import { db, auth } from './firebase.jsx';

const Feed = () => {

  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => (
      setPosts(snapshot.docs.map(doc => (
        {
          id: doc.id,
          data: doc.data(),
        }
      )))
    ))
    return () => unsubscribe();
  }, [])

  const sendPost = (e) => {
    e.preventDefault();
    if(!input.trim()) return;

    try{
      addDoc(collection(db, "posts"),{
        name: "Sonny Sangha",
        description: "This is a test",
        message: input,
        photoUrl: "",
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch(error){
      console.log("Error adding document", error);
    }
  }

  return (
    <div className='feed'>
      <div className="feed__inputContainer">
        <div className="feed__input">
            <CreateIcon/>
            <form>
                <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
                <button onClick={sendPost} type='submit'>Send</button>
            </form>
        </div>
        <div className="feed__inputOptions">
        <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9"/>
        <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E"/>
        <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD"/>
        <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC15E"/>
      </div>
      </div>
      {/* Posts */}
      {posts.map(({id, data: { name, description, message, photoUrl}}) => (
        <Post 
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
    </div>
  )
}
export default Feed;
