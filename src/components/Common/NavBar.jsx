import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {Link,matchPath,useLocation} from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { FaCartPlus } from "react-icons/fa";
import ProfileDropDown from '../Auth/ProfileDropDown'
import Button from "../Button"
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { BsChevronDown } from "react-icons/bs";

const subLinks = [
    {
        title:"python",
        link:"/catalog/python"
    },
    {
        title:"web dev",
        link:"/category/web-development"
    }
];

function NavBar() {
    const {token} = useSelector((state) => state.auth);
    const totalItems = useSelector((state) => state.totalItems);
    const {user} = useSelector((state)=> state.profile);

    const location = useLocation();
    const mathRoute = (path)=>{
        return matchPath(path,location.pathname);
    }
    // const [subLinks,setsubLinks] = useState([]);
    // const fetchSubLinkes = async()=>{
    //     try{
    //         const result = await apiConnector("GET",categories.CATEGORIES_API);
    //         console.log(result);
    //         setsubLinks(result.data.data);
    //     }
    //     catch(error){
    //         console.log("could not fetch the category link");
    //     }
    // }
    // useEffect(()=>{
    //     fetchSubLinkes();
    // },[])

  return (
    <div className='h-14 border-b-[1px] border-b-richblack-700 flex items-center justify-center'>
      <div className='flex w-11/12  items-center justify-between'>
            <Link to={"/"}>
                <img src={logo} width={160} height={42} loading='lazy' />
            </Link>
            <nav>
                <ul className='flex flex-row gap-x-6 text-richblack-25'>
                    {
                    NavbarLinks.map((element,index)=>(
                        <li key={index}>
                            {
                                element.title === "Catalog"?(
                                <div className='cursor-pointer flex items-center justify-center gap-x-1 relative group'>
                                    <p>{element.title}</p>
                                    <BsChevronDown />
                                    <div className='invisible absolute flex flex-col z-[1000] rounded-md bg-richblack-5 p-4 text-richblack-900 w-[300px] left-[50%] translate-x-[-50%] translate-y-[70%] transition-all duration-200 group-hover:visible group-hover:translate-y-[6.65em] '>
                                    <div className="absolute left-[50%] top-0   h-6 w-6 translate-x-[80%] translate-y-[-45%] rotate-45  rounded bg-richblack-5"></div>
                                        {
                                            subLinks.length?
                                            (subLinks.map((element,index)=>(
                                                <Link to={`${element.link}`} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                key={index}>
                                                    <p>{element.title}</p>
                                                </Link>
                                            ))):
                                            (<div></div>)
                                        }
                                    </div>
                                </div>
                                ):(
                                    <Link  to={element?.path} className={`${mathRoute(element?.path)? "text-yellow-25":""}`}>
                                        {element.title}
                                    </Link>
                                )
                               
                            }
                            
                        </li>
                        
                    ))
                    }
                </ul>
            </nav>
            {/* Login signup dashboard */}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType != "Instructor" && (
                        <Link to={"/dashboard/cart"}>
                            <FaCartPlus />
                            {
                                totalItems>0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/login"}>
                            <Button  active={false} linkto={"/login"}>Log In</Button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/signup"}>
                            <Button active={false} linkto={"/signup"}>Sign Up</Button>
                        </Link>
                    )
                }

                {
                    token !== null && <ProfileDropDown/>
                }

            </div>

      </div>
    </div>
  )
}

export default NavBar
