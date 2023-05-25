import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Topbar from '../Components/Topbar/Topbar';
import Banner from '../Components/Banner/Banner'

function Homepage() {

    return (
        < >
            <Topbar/>
            <Banner/>
        </>
    )
}

export default Homepage
