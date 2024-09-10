import {
    Box,
    CircularProgress,
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
    const [loading, setLoading] = useState(true);

    const handleParentToggle = useCallback(async () => {
        const result = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}${roomApis.listAll}`
        );
        // console.log("result-------------");
        // console.log(result.data);
        setRooms(result.data);
        setLoading(false);
    }, []);

    const handleServerEvent = useCallback(
        (data) => {
            const { event } = data;
            // console.log("event");
            // console.log(event);
            switch (event) {
                case "roomToggleDash":
                    console.log("Room toggled");
                    handleParentToggle();
                    break;

                default:
                    console.log("hitting no case on dashboard side");
                    break;
            }
        },
        [handleParentToggle]
    );

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
            {loading ? (
                <Box sx={{ display: "flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
                    <CircularProgress />
                </Box>
            ) : (
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
                        {rooms &&
                            rooms.map((room, index) => (
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
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between">
                                                    <Typography variant="h6">
                                                        Room ID: {room.roomId}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        Baby Device ID:
                                                        {room.baby ? room.baby.deviceId : "No Baby Present"}
                                                    </Typography>
                                                </Box>
                                            }
                                            secondary={
                                                <Box mt={2}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        gutterBottom>
                                                        Parent Device IDs:
                                                    </Typography>
                                                    <Box>
                                                        {room.parents.map(
                                                            (
                                                                parent,
                                                                parentIndex
                                                            ) => (
                                                                <Typography
                                                                    key={
                                                                        parentIndex
                                                                    }
                                                                    variant="body2"
                                                                component="span">
                                                                    {parent.deviceId}{", "}
                                                                </Typography>
                                                            )
                                                        )}
                                                    </Box>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                </Paper>
                            ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};
