import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import axios from "axios";

export const Dashboard = () => {
    const socket = useSocket();
    const [rooms, setRooms] = useState();

    const handleParentToggle = async () => {
        const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/room/listAll`);
        console.log("result-------------");
        console.log(result.data);
        setRooms(result);
    }

    const handleServerEvent = useCallback((data) => {
        const { event } = data;
        switch (event) {
            case "roomDeletion":
                handleParentToggle();
                break;

            case "babyJoinSuccess":
                handleParentToggle();
                break;
        
            default:
                console.log("hitting no case on dashboard side");
                break;
        }
    }, [])

    useEffect(() => {
        handleParentToggle();
        socket.on('connect', () => {
            console.log("Connected to socket.io server");
        });
        socket.on('userEventListen', handleServerEvent)
      
        return () => {
            socket.off('connect', () => {
                console.log("Connected to socket.io server");
            })
        }
    }, [socket, handleServerEvent]);

    return (
        <Box>
            <Typography variant="h3" gutterBottom>
                Active Rooms
            </Typography>
            

        </Box>
    );
};
