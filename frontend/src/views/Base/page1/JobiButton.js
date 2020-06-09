import React from "react";
export const  JobiButton = () => {


    clickJobi() {
        Axios.get("http://localhost:3000/api/jobi");
            
    }
    return (
<button>Jobi</button>
    );
};
export default JobiButton;
