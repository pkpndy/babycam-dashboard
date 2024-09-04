import { createContext, useContext, useMemo } from "react";
import { getSocket } from "../services/socket";

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = (props) => {
    const socket = useMemo(() => getSocket(), []);

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}