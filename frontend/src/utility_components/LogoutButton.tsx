import { useUserContext } from "../contexts/UserContext"

export default function LogoutButton() {

    const userContext = useUserContext()

    const logout = () => {
        userContext.logout()
    }

    return (
        <button className="text-1.5xl text-[#ffffff] bg-[#262b6c] h-[30px] w-[80px] rounded-md" onClick={logout} >Log Out</button>
    )
}
