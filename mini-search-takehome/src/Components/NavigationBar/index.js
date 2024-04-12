import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../Images/logo.png'
import { useState, useEffect } from 'react';
import "./NavigationBar.css"

export default function ButtonAppBar() {
    const [isVisible, setIsVisible] = useState(false)

    const showButton = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
    }

    const topScroll = () => {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', showButton);

        return () => {
            window.removeEventListener('scroll', showButton)
        }
    }, [])
   


  return (
    <Box sx={{ flexGrow: 1 }}>
        <div className='app-bar-header'>

      <AppBar position="fixed" >
        <Toolbar>
          
          <div className='nav-container'>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color:"black", fontWeight:"600"}}>
            Mini Search
            
          </Typography>
            <div className='scroll-btn-container'>

          {isVisible && (
              <button onClick={topScroll} className="scroll-to-top">Back To Top</button>
              )}
              </div>
          
          <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
              </div>
    </Box>
  );
}