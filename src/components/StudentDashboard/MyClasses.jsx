import { useState } from "react";

const MyClasses = () => {

    const [myClass, setMyClasses] = useState([])

    fetch(`${import.meta.env.VITE_api_link}/classes`)
    .then(res => res.json())
    .then(data => setMyClasses(data))

    console.log(myClass);
    

    return (
        <div>
            <h2>this is my class{myClass.length}</h2>    
        </div>
    );
};

export default MyClasses;