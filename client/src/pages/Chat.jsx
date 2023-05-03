import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Startbox from "../components/Startbox";
import Chatbox from "../components/Chatbox";
import Contacts from "../components/Contacts";
import { authUser, getAllUser, url } from '../axios/api';
import { io } from 'socket.io-client';

const Chat = () => {
    const socket = useRef();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('userToken');

    const [logUser, setLogUser] = useState({});
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [notif, setNotif] = useState("");

    useEffect( () =>{
        loadUser();
        getAllUsers();
    }, []);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(url);
            socket.current.emit("add-user", currentUser.user_id);
        }
    }, [currentUser]);

    const loadUser = async () =>{
        const response = await authUser({token: token});
        if(response.data.status == "success") {
            setLogUser(response.data.user);
            setCurrentUser(response.data.user);
        } else {
            navigate('/login');
        }
    }

    const getAllUsers = async () =>{
        const response = await getAllUser({token: token});
        if(response.data.status == "success") {
            setContacts(response.data.users);
        } else {
            navigate('/login');
        }
    }

    const handleChangeChat = (contact) => {
        setCurrentChat(contact);
    };

    return (
        <div className='page'>
            <div className='chat-container bg-info rounded p-3 d-flex gap-3'>
                <Contacts contacts={contacts} logUser={logUser} loadUser={loadUser} changeChat={handleChangeChat}/>
                {(currentChat === undefined)?
                <Startbox logUser={logUser}/>
                :
                <Chatbox logUser={logUser} currentChat={currentChat} socket={socket}/>
                }
            </div>
        </div>
    )
}

export default Chat;