import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom"
const ScrollToTop = ({children}) => {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])


    return (
        <div>{children}</div>
    )
}

export default ScrollToTop