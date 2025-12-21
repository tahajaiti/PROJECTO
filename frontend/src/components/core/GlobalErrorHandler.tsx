import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

interface ErrorType {
    code: string
    message: string
}

export const GlobalErrorHandler = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        return queryClient.getQueryCache().subscribe((event) => {
            const error = event?.query?.state?.error as ErrorType | undefined

            if (!error) return

            switch (error.code) {
                case "UNAUTHORIZED":
                    navigate("/login")
                    break
                case "FORBIDDEN":
                    navigate("/")
                    break
                case "NOT_FOUND":
                    navigate("/not-found")
                    break
                default:
                    break
            }
        })
    }, [navigate, queryClient])

    return null
}
