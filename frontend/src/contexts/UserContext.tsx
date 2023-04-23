import { createContext, ReactNode, useContext } from 'react'
import UserDTO from '@shared/dtos/UserDTO';
import { UnimplementedFunction } from '../utils';
import AEYBResponse from '@shared/responses/utils';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import useLocalStorage from '../hooks/UseLocastrorage';
import API from '@shared/api';
import { CredentialResponse } from '@react-oauth/google';
import { Permission } from '@shared/utils/Permission';

// Eventually move to config file
axios.defaults.baseURL = import.meta.env.BASE_API_URL;

export type FetcherType = <Url extends keyof API>(
    url: Url, payload?: API[Url]["req"], params?: API[Url]["params"], queryParams?: API[Url]["query"]
) => Promise<void | API[Url]["res"]>

export interface UserContextProps {
    user: UserDTO | null;
    hasPermission: (permission: Permission) => boolean;
    fetcher: FetcherType,
    logout(): Promise<void>;
    relogin(): Promise<void>;
    onLogin(res: CredentialResponse): Promise<void>;
}

export const useUserContext = () => useContext(UserContext);

const UserContext = createContext<UserContextProps>({
    user: null,
    hasPermission: () => false,
    fetcher: async () => UnimplementedFunction(),
    logout: async () => UnimplementedFunction(),
    relogin: async () => UnimplementedFunction(),
    onLogin: async () => UnimplementedFunction(),
})

export function UserContextProvider({ children }: { children?: ReactNode }) {
    const navigate = useNavigate();

    const [user, setUser] = useLocalStorage<UserDTO | null>('user', null);
    const [permissions, setPermissions] = useLocalStorage<Permission[]>('permissions', []);
    const [userToken, setUserToken] = useLocalStorage<string | null>('userToken', null)

    async function relogin() {
        if (userToken) {
            axios.defaults.headers["Authorization"] = `Bearer ${userToken}`;
            const data = await fetcher('GET /api/users/@me');
            if (data) {
                setUser(data.self);
                setPermissions(data.permissions);
                navigate('/', { replace: true })
            }
        }
    }

    async function onLogin(googleData: CredentialResponse) {
        const data = await fetcher('POST /api/users/login', { credential: googleData.credential });
        if (data) {
            setUser(data.user);
            setPermissions(data.permissions);
            setUserToken(data.token)
        }
    }

    async function logout() {
        setUserToken(null);
        setUser(null);
        setPermissions([]);
        navigate('/login', { replace: true });
    }

    async function fetcher<Url extends keyof API>(
        url: Url, payload?: API[Url]["req"], params?: API[Url]["params"], queryParams?: API[Url]["query"]
    ): Promise<void | API[Url]["res"]> {

        let [method, endpoint] = url.split(" ", 2);
        if (params) {
            // Replace all the params in the url
            Object.keys(params).forEach((key) => {
                endpoint = endpoint.replace(`:${key}`, params[key]);
            });
        }

        try {
            const { data: res }: AxiosResponse<AEYBResponse<API[Url]["res"]>> = await axios({
                method,
                url: endpoint,
                data: payload,
                params: queryParams,
                headers: {
                    Authorization: userToken ? `Bearer ${userToken}` : undefined
                }
            });

            if (res.status === 'tokenExpired') {
                alert('your login token is expired')
                logout();
                return
            } else if (res.status === 'error') {
                console.log(res.message);
                return
            } else {
                return res.data;
            }
        } catch (err) {
            console.error(err);
        }
    }

    function hasPermission(permission: Permission) {
        return permissions.includes(permission);
    }

    const contextValue: UserContextProps = {
        user,
        hasPermission,
        fetcher,
        relogin,
        onLogin,
        logout,
    }

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )

}