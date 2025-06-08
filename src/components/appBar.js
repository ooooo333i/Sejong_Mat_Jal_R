import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Slide,
    useScrollTrigger
} from "@mui/material";


function HideOnScroll({ children }) {
    const trigger = useScrollTrigger({
        threshold: 100,
        disableHysteresis: true,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function CustomAppBar() {
    return (
        <HideOnScroll>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: '#4FC3F7',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
                }}
            >
                <Toolbar>
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#81D4FA',
                            mr: 2
                        }}
                    >
                        <img
                            src={process.env.PUBLIC_URL + '/favicon.png'}
                            alt="Logo"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Avatar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            color: 'white'
                        }}
                    >
                        세종대 맛잘알
                    </Typography>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
}

export default CustomAppBar;