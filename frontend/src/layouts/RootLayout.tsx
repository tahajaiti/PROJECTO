import { Outlet } from "react-router-dom"
import { GlobalErrorHandler } from "../components/core/GlobalErrorHandler"

const RootLayout = () => {
    return (
        <>
            <GlobalErrorHandler />
            <Outlet />
        </>
    )
}

export default RootLayout
