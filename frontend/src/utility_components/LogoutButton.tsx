import { useUserContext } from "../contexts/UserContext"

export default function LogoutButton() {

    const userContext = useUserContext()

    const logout = () => {
        userContext.logout()
    }

    return (
        <button className="text-1.5xl text-[#ffffff] bg-[#262b6c] hover:bg-blue-900 px-3 py-0.5 rounded-md" onClick={logout}>
            Log Out
        </button>
    )
}
