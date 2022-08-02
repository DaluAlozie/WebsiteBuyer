export default function Form({children}) {
    // Fetch data from external API
    return(
        <div className="flex justify-center px-6 my-12 ">
            <form className="px-8 pt-6 pb-8 mb-4 bg-blue-800 w-96 rounded-3xl">
                {children}
            </form>
        </div>
    )
}