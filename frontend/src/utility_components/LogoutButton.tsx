import { useUserContext } from "../contexts/UserContext"

export default function LogoutButton() {

    const userContext = useUserContext()

    const logout = () => {
        userContext.logout()
    }

    return (
        <button className="text-1.5xl text-[#ffffff] bg-[#262b6c] py-2 px-4 rounded-md" onClick={logout} >Log Out</button>
    )
}
