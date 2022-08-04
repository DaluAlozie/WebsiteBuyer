import Image from "next/image";
import { LinkedinIcon,FacebookIcon } from "next-share";
import googleLogo from '../public/google-logo.svg'
import azureLogo from '../public/microsoft-logo.svg'

export default function MoreLogins({handleAzure,handleGoogle,handleFacebook,handleLinkedin}) {
    // Fetch data from external API
    return(
        <div className="flex flex-row justify-center mt-4">
            <div className="mr-1 ml-1">
                <button onClick={handleLinkedin}>
                    <LinkedinIcon
                    round={true}
                    size={41}>
                    </LinkedinIcon>
                </button>
            </div>
            <div className="mr-1 ml-1">
                <button onClick={handleFacebook}>
                    <FacebookIcon
                    round={true}
                    size={41}>
                    </FacebookIcon>
                </button>
            </div>
            <div className="mr-1 ml-1">
                <button 
                className="bg-white rounded-full w-10 h-10 p-0 mt-"
                onClick={handleGoogle}>
                    <Image src={googleLogo}
                        height={40}
                        width={40}
                        >
                    </Image>
                </button> 
            </div>
            <div className="mr-1 ml-1">
                <button 
                className="bg-white rounded-full w-10 h-10 pt-1 m-0"
                onClick={handleAzure}>
                    <Image src={azureLogo}
                        height={20}
                        width={20}
                        >
                    </Image>
                </button> 
            </div>       
        </div>
    )
}