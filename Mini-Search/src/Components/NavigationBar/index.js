import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState, useEffect } from "react";
import { ReactComponent as Sun } from "../../Images/Sun.svg";
import { ReactComponent as Moon } from "../../Images/Moon.svg";
import "./NavigationBar.css";

export default function ButtonAppBar() {
  const [isVisible, setIsVisible] = useState(false);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("colorSelected", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("colorSelected", "light");
  };

  const colorSelected = localStorage.getItem("colorSelected");

  if (colorSelected === "dark") {
    setDarkMode();
  }

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  const showButton = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const topScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", showButton);

    return () => {
      window.removeEventListener("scroll", showButton);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="app-bar-header">
        <AppBar position="fixed" className="top-nav">
          <Toolbar>
            <div className="nav-container">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{ color: "#171717", fontWeight: "600" }}
              >
                <p className="nav-title">Mini Search</p>
              </Typography>

              {isVisible && (
                <div className="scroll-btn-container">
                  <button onClick={topScroll} className="scroll-to-top">
                    <KeyboardArrowUpIcon
                      sx={{ fontSize: 30 }}
                    ></KeyboardArrowUpIcon>
                    <span>Back to Top</span>
                  </button>
                </div>
              )}

              <div className="dark_mode">
                <input
                  className="dark_mode_input"
                  type="checkbox"
                  id="darkmode-toggle"
                  onChange={toggleTheme}
                  defaultChecked={colorSelected === "dark"}
                />
                <label className="dark_mode_label" htmlFor="darkmode-toggle">
                  <Sun />
                  <Moon />
                </label>
              </div>
            </div>

            <a
              href="https://github.com/elisaia55/Mini-Search"
              target="__blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon
                style={{ color: "var(--button_color)" }}
                sx={{ fontSize: 29, padding: "12px" }}
              ></GitHubIcon>
            </a>
          </Toolbar>
        </AppBar>
      </div>
    </Box>
  );
}
