export default function Form({children}) {
    // Fetch data from external API
    return(
        <div className="flex justify-center px-12 my-12 mx-20">
            <form className="px-8 pt-6 pb-8 mb-4 bg-blue-800 w-96 rounded-3xl" style={{minWidth: "350px"}}>
                {children}
            </form>
        </div>
    )
}