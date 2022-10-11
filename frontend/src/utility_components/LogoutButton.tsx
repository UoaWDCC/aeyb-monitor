import { useUserContext } from "../contexts/UserContext"

export default function LogoutButton() {

    const userContext = useUserContext()

    const logout = () => {
        userContext.logout()
    }

    return (
        <button className="text-1.5xl text-[#ffffff] bg-[#262b6c] p-2 px-4 rounded-md ml-10" onClick={logout} >Log Out</button>
    )
}
