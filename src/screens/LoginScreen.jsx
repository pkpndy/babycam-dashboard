import {
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    Stack,
    TextField,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { adminApis } from "../apis/backend.apis";

export const LoginScreen = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Move useRef outside of useEffect
    const hasRunRef = useRef(false);  // Ref initialized at the top level

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (values) => {
        console.log(`${process.env.REACT_APP_API_BASE_URL}${adminApis.login}`);
        try {
            const loginResponse = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}${adminApis.login}`,
                {
                    email: values.emailId,
                    password: values.password,
                },
                { withCredentials: true }
            );
            console.log(loginResponse);
            if (loginResponse.data.message === "login success") {
                navigate("/roomsDashboard");
            }
        } catch (err) {
            console.error("Error during login: ", err);
        }
    };

    const formik = useFormik({
        initialValues: {
            emailId: "",
            password: "",
        },
        validationSchema: Yup.object({
            emailId: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Required"),
        }),
        validateOnChange: true,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log("crossing checkauth");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}${adminApis.auth}`,
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    navigate("/roomsDashboard");
                }
            } catch (err) {
                console.log("Not authenticated: ", err);
            }
            setLoading(false);
        };

        if (!hasRunRef.current) {
            checkAuth(); // Run the function only once
            hasRunRef.current = true;  // Mark as executed
        }

    }, [navigate]);

    return (
        <Box
            sx={{
                backgroundColor: "whitesmoke",
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                    m: 1,
                    height: 256,
                    width: 350,
                },
                alignItems: "center",
                height: "100vh",
                justifyContent: "center",
            }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <Paper sx={{ padding: "15px" }} elevation={3}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack
                            direction="column"
                            spacing={2}
                            justifyContent={"space-around"}>
                            <Chip
                                label="Login Details"
                                color="primary"
                                variant="outlined"
                            />
                            <TextField
                                required
                                id="emailId"
                                label="Email"
                                variant="standard"
                                error={
                                    formik.touched.emailId &&
                                    Boolean(formik.errors.emailId)
                                }
                                helperText={
                                    formik.touched.emailId &&
                                    formik.errors.emailId
                                }
                                {...formik.getFieldProps("emailId")}
                                fullWidth
                            />
                            <FormControl
                                sx={{ width: "100%" }}
                                variant="standard">
                                <InputLabel
                                    error={
                                        formik.touched.password &&
                                        Boolean(formik.errors.password)
                                    }
                                    htmlFor="password">
                                    Password
                                </InputLabel>
                                <Input
                                    required
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    error={
                                        formik.touched.password &&
                                        Boolean(formik.errors.password)
                                    }
                                    {...formik.getFieldProps("password")}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }>
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {formik.touched.password &&
                                formik.errors.password ? (
                                    <div style={{ color: "red" }}>
                                        {formik.errors.password}
                                    </div>
                                ) : null}
                            </FormControl>
                            <Button
                                type="submit"
                                sx={{ margin: "10px" }}
                                startIcon={<LoginIcon />}
                                variant="contained">
                                LogIn
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            )}
        </Box>
    );
};
