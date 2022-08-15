export default function Input({id,type,placeholder,onChange,required,label,value}) {
    // Fetch data from external API

    return(
        <>
        <label htmlFor={id} className="font-mono text-sm font-bold text-gray-100">
            {label}
        </label>
        { value && (
            <input
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={value || ""}
        />
        )}
        { !value && (
            <input
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        )}
        
        </>
    )
}