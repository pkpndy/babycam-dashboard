import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

export const Dashboard = () => {
    const socket = useSocket();

    const handleServerEvent = (data) => {
        const { event } = data;
        switch (event) {
            case "roomDeletion":
                console.log("room deletion happened");
                break;

            case "babyJoinSuccess":
                console.log("room created baby joined")
                break;
        
            default:
                console.log("hitting no case on dashboard side");
                break;
        }
    }

    useEffect(() => {
        socket.on('connection', () => {
            console.log("Connected to socket.io server");
        });
        socket.on('userEventListen', handleServerEvent)
      
        return () => {
            socket.off('connection', () => {
                console.log("Connected to socket.io server");
            })
        }
    }, [socket]);

    return (
        <Box>
            <Typography variant="h3" gutterBottom>
                Active Rooms
            </Typography>

        </Box>
    );
};
