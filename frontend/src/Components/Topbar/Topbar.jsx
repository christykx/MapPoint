import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// import Homepage from '../Components/Homepage/Homepage'
import mappointlogo from './icons8-where-48.png'
import { AuthContext } from '../../authContext/AuthContext';

function Topbar() {

    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)

    const logout = () => {
        localStorage.removeItem("user")
        window.location.reload(false);
        navigate('/login')
    }

    return (

        <div style={{ backgroundColor: 'black', padding: '10px' }}>
            <Stack direction="row" justifyContent="space-between" gap={3}>
                {/* <LocalTaxiIcon style={{ color: 'yellow' }} /> */}
                <img alt="logo" style={{ width: '40px', height: '40px', cursor: 'pointer' }} onClick={() => { navigate('/') }} src={mappointlogo}></img>
                {/* <Typography style={{ color: 'white', marginTop: '10px' }} >Hi {currentUser?.user?.username}</Typography> */}
                <Typography style={{ color: 'white', marginTop: '10px' }}>
                    Hi {currentUser?.user?.username.charAt(0).toUpperCase() + currentUser?.user?.username.slice(1)}
                </Typography>

                {/* { console.log(currentUser) } */}
                <Stack direction="row" justifyContent="flex-end">
                    <Typography style={{ color: 'white', marginTop: '10px', cursor: 'pointer' }} onClick={logout}>Logout</Typography>
                </Stack>
            </Stack>

        </div>


    )
}

export default Topbar
