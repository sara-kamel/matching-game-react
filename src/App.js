import { useState, useEffect } from "react";
import "./App.css";
import MatchingList from "./MatchingList";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { findShownItem, shuffleArray } from "./helper";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100px",
}));

function App() {
  const [shuffledItems, setShuffledItems] = useState([]);
  // const [prevImage, setPrevImage] = useState([]);

  useEffect(() => {
    setShuffledItems(shuffleArray([...MatchingList]));
  }, []);

  function comparisonItems(item) {
    const newList = [...shuffledItems] 
    const shownItem = findShownItem(newList);
    item.status = "show";
    if (!shownItem) {
      setShuffledItems(newList)
      return;
    }
    setShuffledItems(newList)
    //  else {

    //   item.category === shownItem.category
    //     ? item.status === "matching" && shownItem.status === "matching"
    //     : item.status === "init" && shownItem.status === "init";

    // }
  }

  return (
    <>
      <Box>
        <h1 className="header">Matching Game</h1>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          margin={{ xs: 5, md: 30 }}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {shuffledItems.map((item) => (
            <Grid key={item.name} xs={2} sm={4} md={4}>
              <Item
                style={
                  item.status === "matching"
                    ? { background: "green" }
                    : { background: "rgb(255 49 49)" }
                }
                onClick={() => {
                  comparisonItems(item);
                }}
              >
                {item.status === "show" ? (
                  <img
                    max-width="100px"
                    height="100px"
                    src={item.image}
                    alt={item.name}
                  />
                ) : ""}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default App;
