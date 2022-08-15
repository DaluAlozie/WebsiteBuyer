import { useState } from "react";

export default function Button({id,type,onClick,tempDisabled,children}) {
    const [disabled,setDisabled] = useState(tempDisabled)

    const props = {
        ...(id && {id:id}),
        ...(type && {type:type}),
        ...(onClick && {onClick:onClick}),
    }
    // Fetch data from external API
    return(
        <>
        <button
           {...props}
            disabled={(disabled==undefined)?false:true}
            className="w-full px-4 py-2 font-mono font-bold text-gray-100 bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline mt-10"
        >
            {children}
        </button>
        </>
    )      
}