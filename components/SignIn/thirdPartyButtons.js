import Image from "next/image";
import { LinkedinIcon,FacebookIcon } from "next-share";
import googleLogo from '../../public/google-logo.svg'
import azureLogo from '../../public/microsoft-logo.svg'


export default function MoreLogins({handleAzure,handleGoogle,handleFacebook,handleLinkedin}) {

    return(
        <div className="flex flex-row justify-center mt-4">
            {/* <div className="ml-1 mr-1">
                <button onClick={handleLinkedin}>
                    <LinkedinIcon
                    round={true}
                    size={41}>
                    </LinkedinIcon>
                </button>
            </div> */}
            <div className="ml-1 mr-1">
                <button onClick={handleFacebook}>
                    <FacebookIcon
                    round={true}
                    size={41}>
                    </FacebookIcon>
                </button>
            </div>
            <div className="ml-1 mr-1">
                <button 
                className="w-10 h-10 p-0 bg-white rounded-full mt-"
                onClick={handleGoogle}>
                    <Image src={googleLogo}
                        height={40}
                        width={40}
                        alt="Goodle"
                        >
                    </Image>
                </button> 
            </div>
            <div className="ml-1 mr-1">
                <button 
                className="w-10 h-10 pt-1 m-0 bg-white rounded-full"
                onClick={handleAzure}>
                    <Image src={azureLogo}
                        height={20}
                        width={20}
                        alt="Microsoft"
                        >
                    </Image>
                </button> 
            </div>       
        </div>
    )
}