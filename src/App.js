import { useState, useEffect } from "react";
import "./App.css";
import MatchingList from "./MatchingList";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import {  shuffleArray } from "./helper";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100px",
}));

function App() {
  const [shuffledItems, setShuffledItems] = useState(() => {
    return shuffleArray([...MatchingList]);
  });
  const [matchedItems, setMatchedItems] = useState([]);

  useEffect(() => {
    if (matchedItems.length) {
      setTimeout(() => {
        const newList = [...shuffledItems];
        const firstItem = newList.find((i) => i.name === matchedItems[0].name);
        const secondItem = newList.find((i) => i.name === matchedItems[1].name);
        firstItem.status = "matching";
        secondItem.status = "matching";
        setShuffledItems(newList);
      }, 1000);
    }
  }, [matchedItems]);

  function comparisonItems(item) {
    if(item.status === 'matching') return;

    const newList = [...shuffledItems];
    const filteredItems = newList.filter((i) => i.status === "show");
    let shownItem = null;
    if (filteredItems.length > 1) {
      newList.forEach((i) => {
        if (i.status === "show") i.status = "init";
      });
    } else if (filteredItems.length === 1) {
      // only one item is shown
      shownItem = filteredItems[0];
    }

    const currentItem = newList.find((i) => i.name === item.name);
    currentItem.status = "show";
    if (shownItem && currentItem.category === shownItem.category) {
      setMatchedItems([currentItem, shownItem]);
    }

    setShuffledItems(newList);
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
                className={item.status=== 'matching' ? 'matched-item': 'shown-item'}
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
                ) : (
                  ""
                )}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default App;

