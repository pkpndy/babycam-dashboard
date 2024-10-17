import { io } from "socket.io-client";

//we are using this to add a check for side effect
//as anything that doesn't effect the component in react is called side effect
//this is called single pattern

let socket;
export const getSocket = () => {
    if (!socket) {
        socket = io(`${process.env.REACT_APP_SOCKET_BASE_URL}/admin`, { transports: ['websocket'] });
    }
    return socket;
}