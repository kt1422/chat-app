import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import ModalLogout from "./ModalLogout";
import ModalAvatar from "./ModalAvatar";
import ModalLoading from "./ModalLoading";
import ModalComplete from "./ModalComplete";

const Contacts = (props) => {
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [notif, setNotif] = useState(undefined);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        props.changeChat(contact);
    };

    return (
        <div className="col-3 h-100 bg-primary text-white p-3 d-flex flex-column rounded">
            <div className='d-flex justify-content-center gap-3 mb-2'>
                <img src={logo} style={{height: 30, width: 30}} alt="logo" />
                <h4 className="fw-bold" style={{fontFamily: "Comic Sans MS"}}>Kode Chat</h4>
            </div>
            <div id='style-4' className="overflow-auto h-100 pe-2">
                <div>
                    {
                    props.contacts.map((contact, index) => {
                        return (
                            <div key={contact._id} 
                            className={`contact rounded ${index === currentSelected ? "selected" : ""} ${index === notif ? "notif" : ""}`}
                            onClick={() => changeCurrentChat(index, contact)}>
                                <div className="d-flex gap-2 align-items-center p-2 ">
                                    <img className="rounded-circle" style={{height: 30, width: 30}} src={contact.pic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
                                    <h4 className="fw-bold pt-1" style={{fontFamily: "Comic Sans MS"}}>{contact.username}</h4>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="nav-item dropdown dropup">
                    <a className="nav-link dropdown-toggle d-flex align-items-center fs-4" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className="logos rounded-circle me-2" src={props.logUser.pic} alt="" style={{width: 35, height: 35}}/>
                        <span className="me-1">
                        {props.logUser.username}
                        </span>
                    </a>
                    <ul className="dropdown-menu">
                        <li>
                            <Link className={`dropdown-item`} data-bs-toggle="modal" data-bs-target="#uploadAvatar">Change Avatar</Link>
                        </li>
                        <li>
                            <Link className={`dropdown-item`} data-bs-toggle="modal" data-bs-target="#exampleModal4">Log out</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <ModalLogout/>
            <ModalAvatar loadUser={props.loadUser}/>
            <ModalLoading></ModalLoading>
            <button id="modalLoadingBtn" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalLoading" hidden></button>
            <ModalComplete></ModalComplete>
            <button id="modalCompleteBtn" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalComplete" hidden></button>
        </div>
    )
}

export default Contacts