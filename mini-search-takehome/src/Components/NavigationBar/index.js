import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import "./NavigationBar.css"
import { ReactComponent as Sun } from '../../Images/Sun.svg';
import { ReactComponent as Moon} from '../../Images/Moon.svg'

export default function ButtonAppBar() {
    const [isVisible, setIsVisible] = useState(false)



    const setDarkMode = () => {
      document.querySelector("body").setAttribute('data-theme', 'dark');
      localStorage.setItem('colorSelected', "dark")
    }

    const setLightMode = () => {
      document.querySelector("body").setAttribute('data-theme', 'light');
      localStorage.setItem('colorSelected', "light")

    }

    const colorSelected = localStorage.getItem('colorSelected')

    if (colorSelected === "dark") {
      setDarkMode()
    }

const toggleTheme = (e) => {
  if (e.target.checked) setDarkMode()
  else setLightMode()
}

    

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

      <AppBar position="fixed" className='top-nav' >
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
          
              <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={colorSelected === "dark"}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
          </div>
        </Toolbar>
      </AppBar>
              </div>
    </Box>
  );
}