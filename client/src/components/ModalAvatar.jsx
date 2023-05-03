import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { changeAvatar } from '../axios/api';

const ModalAvatar = (props) => {
    const cookies = new Cookies();
    const token = cookies.get('userToken');
    const navigate = useNavigate();
    const [image, setImage] = useState([]);
    const [urls, setUrls] = useState([]);
    const [uploads, setUploads] = useState([]);

    useEffect( () =>{
        if(uploads.length!=0){
            setUrls([]);
            setImage([]);
            saveUpload();
        }
    }, [uploads]);

    const uploadFiles = (files) =>{
        if(files.length>=1){
            setUrls(files[0]);
            const url = URL.createObjectURL(files[0]);
            const img = new Image();
            img.src = url;
            img.onload = () => {
                if(img.height>=img.width){
                    setImage({flow: "h-100", imgUrl: url});
                } else {
                    setImage({flow: "w-100", imgUrl: url});
                }
            };
        }else if(files.length==0){
            //nothing
        }
    }

    const uploadHandle = () =>{
        const imageRef = ref(storage, `images/${urls.name + v4()}`);
        uploadBytes(imageRef, urls).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUploads(url);
            });
        });
    }

    const saveUpload = async () =>{
        document.getElementById('modalLoadingBtn').click();
        const response = await changeAvatar({token: token, pic: uploads});
        if(response.data.status == "success") {
            await props.loadUser(token);
            setTimeout(function() {
                document.getElementById('closeLoading').click();
                document.getElementById('modalCompleteBtn').click();
                setUploads([]);
            }, 2000);
        } else {
            document.getElementById('closeLoading').click();
            navigate('/login');
        }
    }

    const cancelFiles = () =>{
        setImage([]);
    }

    return (
        <div>
            <div className="modal fade" id="uploadAvatar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" style={{color: "black"}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-flex">
                            <h1 className="modal-title fs-5 flex-fill text-center">Change Avatar</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>cancelFiles()}></button>
                        </div>
                        <div className="modal-body p-0 w-100 bg-black d-flex justify-content-center align-items-center" style={{height: 365}}>
                            {
                            (image.length<1)?
                            <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white gap-3'>
                                <i className="fa-solid fa-photo-film" style={{fontSize: 100}}></i>
                                <p className='fs-4 mb-0'>Upload PNG or JPG image</p>
                                <button type="button" className="btn btn-primary btn-sm" onClick={()=>document.getElementById('chooseFile').click()}>Select from computer</button>
                                <input id='chooseFile' type='file' accept="image/png, image/jpeg" onChange={(e) => uploadFiles(e.target.files)} hidden/>
                            </div>
                            :
                            <div className="w-100">
                                <div className="carousel-item active" style={{height: 350}}>
                                    <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                                        <img className={image.flow} src={image.imgUrl}/>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>cancelFiles()}>Cancel</button>
                            {
                            (image.length<1)?
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nextModal" disabled>Upload</button>
                            :
                            <button type="button" className="btn btn-primary" onClick={()=>uploadHandle()} data-bs-dismiss="modal">Upload</button>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAvatar