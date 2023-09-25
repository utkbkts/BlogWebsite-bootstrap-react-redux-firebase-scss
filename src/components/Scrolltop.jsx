import React, { useEffect, useState } from 'react'

const Scrolltop = () => {
    const [isvisible,setisvisible]=useState(false)
    const toggle=()=>{
        if(window.pageYOffset>200){
            setisvisible(true)
        }else{
            setisvisible(false)
        }
    }
    const scrollToTop = ()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }
    useEffect(()=>{
        window.addEventListener("scroll",toggle)

        return ()=>{
            window.removeEventListener("scroll",toggle)
        }
    },[])
  return (
    <div className='scroll-to-top'>
        {isvisible && (
            <button onClick={scrollToTop}>
                <i className="fa fa-arrow-up"></i>
            </button>
        )}
    </div>
  )
}

export default Scrolltop