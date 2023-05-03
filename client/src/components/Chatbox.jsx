import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import { v4 as uuidv4 } from "uuid";
import { getMessage, sendMessage } from "../axios/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chatbox = (props) => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('userToken');

    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    // const [currentBox, setCurrentBox] = useState(props.currentChat);
    let test = props.currentChat;

    useEffect( () => {
        handleGetMessage();
    }, [props.currentChat]);
    
    const handleGetMessage = async () => {
        const response = await getMessage({
            token: token, 
            recipient: props.currentChat._id
        });
        if(response.data.status == "success") {
            setMessages(response.data.allMessages);
        } else {
            navigate('/login');
        }
    }

    const [inputMsg, setInputMsg] = useState("");
    const handleKeyDown =(e)=>{
        setInputMsg(e.target.value);
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
    }

    const handleSend = async (e) => {
        e.preventDefault();
        if(inputMsg.length > 0){
            const response = await sendMessage({
                token: token, 
                recipient: props.currentChat._id,
                message: inputMsg
            });

            if(response.data.status == "success") {
                setMessages(oldmsg => [...oldmsg, response.data.newChat]);
                props.socket.current.emit("send-msg", {
                    username: response.data.newChat.username,
                    from: response.data.newChat.sender,
                    to: response.data.newChat.recipient,
                    msg: response.data.newChat.message,
                    date: response.data.newChat.date
                });

                setInputMsg("");
            } else {
                navigate('/login');
            }
        }
    }

    useEffect(() => {
        if (props.socket.current) {
            props.socket.current.on("msg-recieve", (data) => {
                setArrivalMessage({
                    username: data.username,
                    sender: data.from,
                    recipient: data.to, 
                    message: data.msg,
                    date: data.date
                });
            });
        }
    }, []);

    useEffect(() => {
        if(arrivalMessage !== null){
            if(props.currentChat._id === arrivalMessage.sender){
                arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
            } else {
                toast(`${arrivalMessage.username} has sent you a message`);
            }
        }
    }, [arrivalMessage]);
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='d-flex flex-fill bg-primary rounded flex-column text-white p-3'>
            <div className="d-flex w-100 border-bottom pb-1 gap-2">
                <img className="rounded-circle" style={{height: 30, width: 30}} src={props.currentChat.pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
                <h4 className="fw-bold pt-1" style={{fontFamily: "Comic Sans MS"}}>{props.currentChat.username}</h4>
            </div>
            <div id='style-4' className="overflow-auto h-100">
                <div className="d-flex flex-column pe-2">
                {
                messages.map((message, index) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()} className={`${message.sender == props.logUser.user_id ? "align-self-end":"align-self-start"}`}>
                            <div className="d-flex gap-2 mt-3">
                                {message.sender == props.logUser.user_id?
                                <img className="rounded-circle" style={{height: 30, width: 30}} src={props.logUser.pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
                                :
                                <img className="rounded-circle" style={{height: 30, width: 30}} src={props.currentChat.pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
                                }
                                <span className="py-1 px-2 bg-info rounded-pill">{message.message}</span>
                            </div>
                            <div className={`d-flex ${message.sender == props.logUser.user_id ? "justify-content-end":"justify-content-start"}`}>
                                <span className="fw-light py-1" style={{fontSize: 14}}>{message.date}</span>
                            </div>
                        </div>
                    )
                })
                }
                </div>
            </div>
            <div>
                <form className='d-flex align-items-start gap-2' onSubmit={(e) => handleSend(e)}>
                    <textarea className='border-0 comment-box col ps-1 rounded' rows={1} id='message' name='message' placeholder='Send a message...' value={inputMsg} style={{resize: "none"}} onChange={(e)=>handleKeyDown(e)}></textarea>
                    {
                    (inputMsg!=="")?
                    <div className="h-100 d-flex align-items-center">
                        <button type="submit" className='border-0 bg-transparent text-white fw-semibold col-auto'>
                            Send
                        </button>
                    </div>
                    :
                    <div></div>
                    }
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Chatbox