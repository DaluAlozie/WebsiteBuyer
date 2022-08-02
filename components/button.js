import { Children } from "react";

export default function Button({id,type,onClick,children}) {
    // Fetch data from external API
    return(
        <>
        <button
            id={id}
            type={type}
            onClick={onClick}
            className="w-full px-4 py-2 font-mono font-bold text-gray-100 bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
            {children}
        </button>
        </>
    )
}