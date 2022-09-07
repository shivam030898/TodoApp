import React, { useEffect } from 'react'
import {signOut,onAuthStateChanged} from 'firebase/auth'
import {auth,db} from '../firebase'
import {useNavigate} from "react-router-dom"
import { useState } from 'react'
import {uid} from "uid"
import {set,ref,onValue,remove,update} from "firebase/database"
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import './Homepage.css'


const Homepage = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
            setTodos([]);
            const data = snapshot.val();
            if (data !== null) {
              Object.values(data).map((todo) => {
                setTodos((oldArray) => [...oldArray, todo]);
              });
            }
          });
        } else if (!user) {
          navigate("/");
        }
      });
    }, []);
  
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    };
  

    const writeToDatabase = () => {
      const uidd = uid();
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        todo: todo,
        uidd: uidd
      });
  
      setTodo("");
    };
  

    const handleUpdate = (todo) => {
      setIsEdit(true);
      setTodo(todo.todo);
      setTempUidd(todo.uidd);
    };
  
    const handleEditConfirm = () => {
      update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
        todo: todo,
        tempUidd: tempUidd
      });
  
      setTodo("");
      setIsEdit(false);
    };
  
  
    const handleDelete = (uid) => {
      remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };

  return (
    <div className="homepage">
      <input
        className="add-edit-input"
        type="text"
        placeholder="Add todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {todos.map((todo) => (
        <div className="todo">
          <h1>{todo.todo}</h1>
          <EditIcon
            fontSize="large"
            onClick={() => handleUpdate(todo)}
            className="edit-button"
          />
          <DeleteIcon
            fontSize="large"
            onClick={() => handleDelete(todo.uidd)}
            className="delete-button"
          />
        </div>
      ))}

      {isEdit ? (
        <div>
        <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon"/>
        </div>
      ) : (
        <div>
          <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
        </div>
      )}
        <LogoutIcon onClick={handleSignOut} className="logout-icon" />
    </div>
  )
}

export default Homepage