import {
    Box,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import axios from "axios";
import { roomApis } from "../apis/backend.apis";

export const Dashboard = () => {
    const socket = useSocket();
    const [rooms, setRooms] = useState();

    const handleParentToggle = useCallback(async () => {
        const result = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}${roomApis.listAll}`
        );
        console.log("result-------------");
        console.log(result.data);
        setRooms(result.data);
    }, []);

    const handleServerEvent = useCallback((data) => {
        const { event } = data;
        switch (event) {
            case "roomCreated":
                console.log("Room creation occured");
                handleParentToggle();
                break;

            case "roomDeleted":
                console.log("Room detetion occured");
                handleParentToggle();
                break;

            default:
                console.log("hitting no case on dashboard side");
                break;
        }
    }, [handleParentToggle]);

    useEffect(() => {
        handleParentToggle();
        socket.on("connect", () => {
            console.log("Connected to socket.io server");
        });
        socket.on("userEventListen", handleServerEvent);
        
        return () => {
            socket.off("connect", () => {
                console.log("Connected to socket.io server");
            });
            socket.off("userEventListen", handleServerEvent);
        };
    }, [socket, handleServerEvent, handleParentToggle]);

    return (
        <Box>
            <Typography variant="h3" gutterBottom>
                Active Rooms
            </Typography>
            <List
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}>
                {rooms && (rooms.map((room, index) => (
                    <Paper
                        key={index}
                        elevation={3}
                        sx={{
                            width: "80%",
                            padding: 2,
                            borderRadius: 2,
                            boxShadow: 3,
                            backgroundColor: "whitesmoke",
                        }}>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Typography variant="h6">{room.roomId}</Typography>
                                }
                            />
                        </ListItem>
                    </Paper>
                )))}
            </List>
        </Box>
    );
};
