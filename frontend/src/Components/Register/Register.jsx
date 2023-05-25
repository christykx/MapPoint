import React, { useState } from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {

    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [userid, setuserid] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        if (Object.keys(username, email, password).length === 0) {
            alert("Please fill the form properly!");
            return;
        }
        axios.post('http://localhost:3001/users/signup', {

            username: username,
            email: email,
            password: password,
            // cpassword: cpassword

        }).then((response) => {
            if (response?.status) {

                setuserid(response.data?._id)
                navigate('/login')

            } else {
                console.log("erorr")
            }

        }).catch((err) => {
            console.log(err);
            alert(err.response.data)
            console.log("-----errrrr---", err);
        })


    };


    return (
        <div style={{ backgroundImage: 'url(b.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}

                // sx={{
                //     backgroundImage: 'url(b.jpg)',
                //     backgroundRepeat: 'no-repeat',
                //     backgroundColor: (t) =>
                //         t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                //     backgroundSize: 'cover',
                //     backgroundPosition: 'center',
                // }}
                />
                <Grid item xs={12} sx={{ backgroundColor: 'white', opacity: '0.8', marginTop: '15px', height: '90vh' }} sm={4} md={4} component={Paper} elevation={6} square>

                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflowY: 'scroll',
                            height: '78vh'

                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            SIGN UP
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                value={username} onChange={(e) => setusername(e.target.value)}
                                autoComplete="username"
                                autoFocus
                            />

                            {(Object.keys(username).length === 0) &&
                                <p style={{ color: 'red', fontSize: '12px' }}>Please enter your username</p>
                            }
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={email} onChange={(e) => setemail(e.target.value)}
                                autoComplete="email"
                                autoFocus
                            />
                            {(Object.keys(email).length === 0) &&
                                <p style={{ color: 'red', fontSize: '12px' }}>Please enter your email id</p>
                            }
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={password} onChange={(e) => setpassword(e.target.value)}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {(Object.keys(password).length === 0) &&
                                <p style={{ color: 'red', fontSize: '12px' }}>Please enter your password</p>
                            }

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{ backgroundColor: 'black', color: 'white' }}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item sx={{ cursor: 'pointer' }} >
                                    <Link href='/login' variant="body2" style={{ color: 'black' }} >
                                        Already have an account? Sign In
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Register