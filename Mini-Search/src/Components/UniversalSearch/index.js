import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GifIcon from "@mui/icons-material/Gif";
import InfoIcon from "@mui/icons-material/Info";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip } from "@mui/material";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

import { Stack } from "@mui/system";

import "./UniversalSearch.css";

function UniversalSearch() {
  const [wikiResults, setWikiResults] = useState([]);
  const [nbaResults, setNbaResults] = useState([]);
  const [giphyResults, setGiphyResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Wikipedia API Search Logic
  const wikiSearch = async () => {
    if (!searchQuery) return;
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}*;`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.table(data.query.search[0]);
      setWikiResults(data.query.search);
    } catch (error) {
      console.error(`Error retrieving data: `, error);
    }
  };

  // NBA Player Search Logic
  const playerAPIKEY = process.env.REACT_APP_NBA_KEY;
  const nbaSearch = async () => {
    if (!searchQuery) return;
    const url = `https://api-nba-v1.p.rapidapi.com/players?search=${searchQuery}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${playerAPIKEY}`,
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setNbaResults(result.response);
    } catch (error) {
      console.error("Error retrieving data: ", error);
    }
  };

  // Giphy API Search Logic
  const giphyAPIKEY = process.env.REACT_APP_GIPHY_KEY;
  const giphySearch = async () => {
    if (!searchQuery) return;
    try {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKEY}&q=${searchQuery}&limit=22&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();

      setGiphyResults(json.data);
    } catch (error) {
      console.error(`Error retrieving data: `, error);
    }
  };

  // Button Logic

  const searchAll = () => {
    wikiSearch();
    nbaSearch();
    giphySearch();
    setLastSearchQuery(searchQuery);
    setSearchPerformed(true);
  };

  const clearClickAll = () => {
    setSearchQuery("");
    setWikiResults([]);
    setNbaResults([]);
    setGiphyResults([]);
    setLastSearchQuery("");
    setSearchPerformed(false);
  };

  const handleSearchChange = (e) => {
    let inpVal = e.target.value;
    if (inpVal.startsWith(" ")) {
      inpVal = inpVal.trimStart();
    }
    setSearchQuery(inpVal);
    setIsBtnDisabled(!inpVal.trim().length);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchAll();
    }
  };

  return (
    <div className="page-container">
      <div className="search-results-container">
        <div className="text-field-btn-container">
          <div className="search-clear-btn-container">
            <Box
              component="form"
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="fullWidth"
                label="Search Here"
                variant="standard"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                fullWidth
              />
              {searchQuery && (
                <ClearIcon
                  sx={{ fontSize: 18 }}
                  className="clear-btn"
                  variant="contained"
                  onClick={clearClickAll}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Box>

            <div className="btn-container">
              <Box>
                <Stack spacing={5} direction="row">
                  {searchQuery ? (
                    <Button
                      className="search-btn"
                      spacing={2}
                      variant="contained"
                      color="primary"
                      onClick={searchAll}
                      size="large"
                    >
                      Search
                    </Button>
                  ) : (
                    <Tooltip title="Search Field is Empty">
                      <span>
                        <Button
                          className="search-btn"
                          spacing={2}
                          variant="contained"
                          color="primary"
                          onClick={searchAll}
                          size="large"
                          disabled={!searchQuery || isBtnDisabled}
                        >
                          Search
                        </Button>
                      </span>
                    </Tooltip>
                  )}
                </Stack>
              </Box>
            </div>
          </div>
        </div>
        {wikiResults[0]?.pageid === 59351 || wikiResults.length < 0 ? (
          <h2 className="no-results-p">
            <p>Sorry, No results found for </p>
            <span className="no-results-word"> "{lastSearchQuery}"</span>
          </h2>
        ) : (
          <div className="result-wrapper">
            <div className="wiki-container">
              <h2
                className={wikiResults.length > 0 ? "" : "hidden"}
                id={wikiResults.length > 0 ? "wiki_title" : "hidden"}
              >
                <InfoIcon fontSize="medium"></InfoIcon>Wikipedia
              </h2>
              <div className="wiki-results-container">
                {wikiResults.slice(0, 13).map((item) => {
                  const wikiUrl = `https://en.wikipedia.org/?curid=${item.pageid}`;
                  return (
                    <a
                      href={wikiUrl}
                      target="__blank"
                      rel="noreferrer"
                      key={item.pageid}
                    >
                      <div className="wiki-results">
                        <h3>{item.title}</h3>
                        <p
                          dangerouslySetInnerHTML={{ __html: item.snippet }}
                        ></p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="giphy-container">
              <h2
                className={giphyResults.length > 0 ? "" : "hidden"}
                id={giphyResults.length > 0 ? "giphy_title" : "hidden"}
              >
                <GifIcon sx={{ fontSize: 40 }}></GifIcon>GIPHY
              </h2>
              <div className="giphy-results-container">
                {giphyResults.map((item) => (
                  <div key={item.id}>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <img
                        className="giphy-imgs"
                        src={item.images.fixed_height.url}
                        alt={item.title}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
            {searchPerformed && (
              <div>
                <h2
                  id={nbaResults.length > 0 ? "nba_title" : "hidden"}
                  className={nbaResults.length > 0 ? "" : "hidden"}
                >
                  <SportsBasketballIcon fontSize="medium"></SportsBasketballIcon>{" "}
                  NBA
                </h2>
                <div className="results-container">
                  {nbaResults.length > 0 ? (
                    nbaResults.slice(0, 10).map((player) => (
                      <div className="nba-results-container" key={player.id}>
                        <h3 className="nba-names">
                          {player.firstname} {player.lastname}
                        </h3>
                        <div className="player-stats-container">
                          <p className="player-stat-p">
                            College:
                            {player.college === null
                              ? "N/A"
                              : ` ${player.college}`}
                          </p>
                          <p className="player-stat-p">
                            Height:
                            {player.height.feets === null
                              ? "N/A"
                              : ` ${player.height.feets}"${
                                  !player.height.inches ? "0" : "0"
                                }`}
                          </p>
                          <p className="player-stat-p">
                            Weight:
                            {player.weight.pounds === null
                              ? "N/A"
                              : ` ${player.weight.pounds}lbs`}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <h2 id="nba_title">
                        <SportsBasketballIcon></SportsBasketballIcon> NBA
                      </h2>
                      <div className="nba-no-result-container">
                        <p>
                          No Players found by the name{" "}
                          <span className="no-result-nba">
                            "{lastSearchQuery}"
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UniversalSearch;
