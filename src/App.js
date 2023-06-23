import Axios from "axios";
import { useState, useEffect } from "react";
import './App.css'
import FileUpload from "./components/FileUpload";

function App() {

    const [nickName, setNickName] = useState('')
    const [caption, setCaption] = useState('')
    const [postList, setPostList] = useState([])

    useEffect(() =>{
        Axios.get("http://localhost:300/posts").then((response) => {
            setPostList(response.data);
        });
    },[])



    const addPost = () => {
       if (nickName) {
            Axios.post("http://localhost:3001/create", {
                nickname: nickName,
                caption: caption
            }).then(() => {
                setPostList([
                    ...postList,
                    {
                        nickname: nickName,
                        caption: caption
                    },
                ]);
            });
        } else {
           alert('no photo!')
       }
    };

    const getPosts = () => {
        Axios.get("http://localhost:3001/posts").then((response) => {
            setPostList(response.data);
        });
    };

    const hidePosts = () => {
        setPostList([]);
    }

    const deletePost = (id) => {
        if (id) {
            Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
                setPostList(
                    postList.filter((val) => {
                        return val.id != id;
                    })
                );
            });
        }
    }

  return (
    <div className="App">
        <div className={'content'}>
            <h1>Please, caption this!</h1>
            <img style={{width: '800px'}} src={'https://media.newyorker.com/photos/61016c1c7a2a603b3075c7b8/master/pass/chayka-boredapeclub.jpg'}/>

        </div>

        <div className = "form">
          <label>your nickname</label>
            <input
                type={"text"}
                name={"nickname"}
                onChange={(e) => {
                    setNickName(e.target.value)
                }}
            />
          <label>comment</label>
          <input
              type={"text"}
              name={"caption"}
              onChange={(e) => {
                  setCaption(e.target.value)
              }}
          />
            <button onClick={addPost}>post</button>
        </div>
        <button onClick={getPosts}>Show comments</button>
        <button onClick={hidePosts}>Hide comments</button>
        {postList.map((val, key) => {
            return (
                <div className={'post'}>
                    <h2>{val.nickname}</h2>
                    <h2>{val.caption}</h2>
                        <button onClick={() => deletePost(val.id)}>delete comment</button>
                </div>
            )}
        )}
    </div>
  );
}

export default App;
