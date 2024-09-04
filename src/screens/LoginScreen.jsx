import {
    Box,
    Button,
    Chip,
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
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginScreen = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                .min(6, "Password must be atleast 6 characters")
                .required("Required"),
        }),
        onSubmit: (values) => {
            console.log(values);
            navigate("/dashboard");
        },
    });

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
            <Paper sx={{ padding: "15px" }} elevation={3}>
                <form>
                    <Stack
                        direction="column"
                        spacing={2}
                        justifyContent={"space-around"}>
                        <Chip
                            label="Login"
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
                                formik.touched.emailId && formik.errors.emailId
                            }
                            {...formik.getFieldProps("emailId")}
                            fullWidth
                        />
                        <FormControl sx={{ width: "100%" }} variant="standard">
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
                                            onClick={handleClickShowPassword}
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
                            sx={{margin: "10px"}}
                            startIcon={<LoginIcon />}
                            variant="contained">
                            LogIn
                            </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};
