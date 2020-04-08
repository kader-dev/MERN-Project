import axios from "axios";
import { REGISTER_SUCCESS } from './userTypes'


export const register = ({ name, email, password }) => dispatch => {
    fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    }).then(res => {
        return console.log(res.data)
    })
}