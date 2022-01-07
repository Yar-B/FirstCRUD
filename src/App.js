import Axios from "axios";
import { useState, useEffect } from "react";
import './App.css'
import FileUpload from "./components/FileUpload";

function App() {
    const [photo, setPhoto] = useState('')
    const [caption, setCaption] = useState('')
    const [postList, setPostList] = useState([])

    useEffect(() =>{
        Axios.get("http://localhost:3001/posts").then((response) => {
            setPostList(response.data);
        });
    },[])

    const addPost = () => {
       if (photo) {
            Axios.post("http://localhost:3001/create", {
                photo: photo,
                caption: caption
            }).then(() => {
                setPostList([
                    ...postList,
                    {
                        photo: photo,
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
        <div className = "form">
          <label>Photo</label>
            {/*<FileUpload/>*/}
            {/*<input type="file" id="file-input" name="ImageStyle"/>*/}
            <input
                type={"text"}
                name={"photo"}
                onChange={(e) => {
                    setPhoto(e.target.value)
                }}
            />
          <label>Caption</label>
          <input
              type={"text"}
              name={"caption"}
              onChange={(e) => {
                  setCaption(e.target.value)
              }}
          />
            <button onClick={addPost}>post</button>
        </div>
        <button onClick={getPosts}>Show Posts</button>
        <button onClick={hidePosts}>Hide Posts</button>
        {postList.map((val, key) => {
            return (
                <div className={'post'}>
                <h1>{val.photo}</h1>
                <h2>{val.caption}</h2>
                    <button onClick={() => deletePost(val.id)}>delete post</button>
            </div>
            )}
        )}
    </div>
  );
}

export default App;
