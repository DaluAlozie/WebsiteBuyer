import Link from 'next/link'
import {NavLink } from "../../constants/styling";
import { signOut } from '../SignOut/sign-out'


export default function Header({signedInUser}) {
    // Fetch data from external API
    return(
        <header>
            <nav className='flex flex-wrap items-start p-3 bg-blue-800 '>
                <Link href='/'>
                <a className='inline-flex items-center p-2 mr-4 '>
                    <svg
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 mr-2 text-white fill-current'
                    >
                    <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
                    </svg>
                </a>
                </Link>
                <button onClick={()=>document.getElementById("navbar").classList.toggle("hidden")} 
                className='inline-flex p-3 ml-auto text-white rounded outline-none hover:bg-blue-700 lg:hidden hover:text-white'>
                <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                    />
                </svg>
                </button>
                <div id="navbar" className='justify-between hidden w-full font-mono lg:inline-flex lg:flex-grow lg:w-auto'>
                <div className='flex flex-col items-start w-1/2 lg:inline-flex lg:flex-row lg:w-auto lg:items-center lg:h-auto'>
                    <Link href='/'>
                    <a className={NavLink}>
                        Home
                    </a>
                    </Link>
                    
                    { signedInUser && (
                    <>
                    <Link href='/profile'>
                        <a className={NavLink}>
                        Profile
                        </a>
                    </Link>
                    <Link href='/design-website'>
                        <a className={NavLink}>
                        Design Website
                        </a>
                    </Link>
                    <Link href='/checkout'>
                        <a className={NavLink}>
                            Checkout
                        </a>
                    </Link>
                    </>
                    )}

                </div>

                {/*Right Side */}
                <div className='flex flex-col items-end w-1/2 lg:inline-flex lg:flex-row lg:w-auto lg:items-center lg:h-auto'>
                { signedInUser && (
                    <>
                    <Link href="">
                        <a className={NavLink} onClick={signOut}>
                        Logout
                        </a>
                    </Link>
                    </>
                    )}
                    { !signedInUser && (
                    <>
                    <Link href='/sign-in'>
                        <a className={NavLink}>
                        Login
                        </a>
                    </Link>
                    <Link href='/sign-up'>
                        <a className={NavLink}>
                        Sign Up
                        </a>
                    </Link>
                    </>
                    )}

                </div>
                </div>
            </nav>
        </header>

    )
}
