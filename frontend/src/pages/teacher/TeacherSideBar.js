import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';
import QuizIcon from '@mui/icons-material/Quiz';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import GamepadIcon from '@mui/icons-material/Gamepad';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass

    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/class">
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith("/Teacher/class") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={`Class ${sclassName.sclassName}`} />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/quizcreate">
                    <ListItemIcon>
                        <QuizIcon color={location.pathname.startsWith("/Teacher/quizcreate") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Create Identify Game " />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/spellathoncreate">
                    <ListItemIcon>
                        <SpellcheckIcon color={location.pathname.startsWith("/Teacher/spellathoncreate") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Create Spell Game " />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacher/matchingcreate">
                    <ListItemIcon>
                        <GamepadIcon color={location.pathname.startsWith("/Teacher/matchingcreate") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Create Matching Game " />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Teacher/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default TeacherSideBar