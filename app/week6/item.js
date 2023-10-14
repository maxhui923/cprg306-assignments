import React from "react";

export default function Item({name, quantity, category}){
    return(
        <ul className="bg-gray-600 w-80 p-1 m-3" >
            <li className="text-xl font-bold ">{name}</li>
            <li>Buy {quantity} in {category}</li>
        </ul>
    )
}