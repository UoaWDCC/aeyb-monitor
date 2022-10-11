import { createContext, useContext, useState } from 'react'
import UserDTO from '../shared/Types/dtos/UserDTO';
import { UnimplementedFunction } from '../utils';
import { GoogleLoginResponse } from 'react-google-login';
import AEYBResponse from '../shared/Types/responses/utils';
import Permission from '../shared/Types/utils/Permission';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import useLocalStorage from '../hook/UseLocalstrorage';
import API from '../shared/Types/api';

// Eventually move to config file
axios.defaults.baseURL = 'http://localhost:5000';

export type FetcherType = <EndpointUrl extends keyof API>(
    url: EndpointUrl, payload: API[EndpointUrl]["req"], params: API[EndpointUrl]["params"]
) => Promise<API[EndpointUrl]["res"] | null>

export interface UserContextProps {
    user: UserDTO | null;
    permissions: Permission[];
    logout(): void;
    relogin(): Promise<void>;
    onLogin(res: GoogleLoginResponse): Promise<void>;
}

export const useUserContext = () => useContext(UserContext);

const UserContext = createContext<UserContextProps>({
    user: null,
    permissions: [],
    logout: UnimplementedFunction, relogin: async () => UnimplementedFunction(),
    onLogin: async () => UnimplementedFunction(),
})

export function UserContextProvider({ children }) {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserDTO | null>(null);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [localStorageToken, setLocalStorageToken] = useLocalStorage<string | null>('userToken', null)

    async function relogin() {
        if (localStorageToken) {
            axios.defaults.headers["Authorization"] = `Bearer ${localStorageToken}`;
            const data = await fetcher('GET /api/users/@me');
            if (data) {
                setUser(data.self);
                setPermissions(data.permissions);
            }
        }
    }

    async function onLogin(googleData: GoogleLoginResponse) {

        const data = await fetcher('POST /api/users/login', { credential: googleData.tokenId });
        if (data) {
            axios.defaults.headers["Authorization"] = `Bearer ${data.token}`;
            setUser(data.user);
            setPermissions(data.permissions);
            setLocalStorageToken(data.token)
        }
    }

    function logout() {
        setLocalStorageToken(null);
        navigate('/');
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
            });

            if (res.status === 'tokenExpired') {
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

    const contextValue: UserContextProps = {
        user,
        permissions,
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