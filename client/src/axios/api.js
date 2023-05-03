import axios from "axios";
export const url = "http://localhost:8080";

export const register = async(data) => {
    try {
        return await axios.post(url+"/user/register", data);
    } catch (error) {
        console.log("error");
    }
}

export const login = async(data) => {
    try {
        return await axios.post(url+"/user/login", data);
    } catch (error) {
        console.log("error");
    }
}

export const authUser = async(data) => {
    try {
        return await axios.post(url+"/user/auth", data);
    } catch (error) {
        console.log("error");
    }
}

export const getAllUser = async(data) => {
    try {
        return await axios.post(url+"/user/getAllUsers", data);
    } catch (error) {
        console.log("error");
    }
}

export const changeAvatar = async(data) => {
    try {
        return await axios.post(url+"/user/changeAvatar", data);
    } catch (error) {
        console.log("error");
    }
}

export const getMessage = async(data) => {
    try {
        return await axios.post(url+"/chat/getMessage", data);
    } catch (error) {
        console.log("error");
    }
}

export const sendMessage = async(data) => {
    try {
        return await axios.post(url+"/chat/sendMessage", data);
    } catch (error) {
        console.log("error");
    }
}