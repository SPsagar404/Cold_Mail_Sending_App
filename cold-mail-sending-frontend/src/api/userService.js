import axios from "axios";

const API_BASE_URL ="http://localhost:8080/api/users";

export const createUser = async(user) =>{

    try {
        const response = await axios.post(API_BASE_URL,user);
        return response.data;
    } catch (error) {
        console.error("There was an error creating the user!", error);
        throw error;
    }
};

export const getAllUsers = async() =>{
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching all users !",error);
        throw error;
    }
};

export const sendEmailToHr = async (id) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${id}/send-email`);
        return response.data;
    } catch (error) {
        console.error("There was an error sending the email to HR!", error);
        throw error;
    }
};