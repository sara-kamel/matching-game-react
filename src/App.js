import { useState, useEffect } from "react";
import "./App.css";
import MatchingList from "./MatchingList";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { shuffleArray, setLevel, sliceArray } from "./helper";
import { Button, ButtonGroup, Stack } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "150px",
  width: "150px",
}));
 const list = [...MatchingList]
const levelOneItems = sliceArray(list, 0, 4);
function App() {
  const [subheader, setSubheader] = useState("Level One");
  const [shuffledItems, setShuffledItems] = useState(() => {
    return shuffleArray(levelOneItems);
  });
  const [matchedItems, setMatchedItems] = useState([]);

  useEffect(() => {
    if (matchedItems.length) {
      setTimeout(() => {
        const newList = [...shuffledItems];
        for (let i = 0; i < matchedItems.length; i++) {
          newList.forEach((item) => {
            if (item.name === matchedItems[i].name) item.status = "matching";
          });
        }
        setShuffledItems(newList);
      }, 500);
    }
  }, [matchedItems]);

  useEffect(() => {
    const level = setLevel(MatchingList, subheader);
    setShuffledItems(level);
  }, [subheader]);

  function comparisonItems(item) {
    if (item.status === "matching") return;
    const newList = [...shuffledItems];
    const filteredItems = newList.filter((i) => i.status === "show");
    let shownItem = null;
    if (filteredItems.length > 1) {
      filteredItems.forEach((i) => (i.status = "init"));
    } else if (filteredItems.length === 1) {
      shownItem = filteredItems[0];
    }
    item.status = "show";
    if (shownItem && shownItem.name === item.name && shownItem.id !== item.id) {
      setMatchedItems([item, shownItem]);
    }
    setShuffledItems(newList);
  }

  const handleChangeLevel = () => {
    if (subheader === "Level One") {
      setSubheader("Level Two");
    } else if (subheader === "Level Two") {
      setSubheader("Level Three");
    } else {
      setSubheader("Level One");
    }
  };
  return (
    <>
      <Box>
        <h1 className="header">Matching Game</h1>
      </Box>
      <Stack direction="row" justifyContent="center">
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button onClick={() => setSubheader("Level One")}>Easy</Button>
          <Button onClick={() => setSubheader("Level Two")}>Medium</Button>
          <Button onClick={() => setSubheader("Level Three")}>Hard</Button>
        </ButtonGroup>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
      <h4 className="subheader">{subheader}</h4>
        <Grid
          container
          width = {{ xs: "80%", md: subheader === "Level One" ? "50%" : "70%" }}
          margin="auto"
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
     
          {shuffledItems.map((item) => (
            <Grid
              key={item.id}
              xs={2}
              sm={2}
              md={subheader === "Level One" ? 3 :2}
            >
              <Item
                className={
                  item.status === "matching" ? "matched-item" : "shown-item"
                }
                onClick={() => {
                  comparisonItems(item);
                }}
              >
                {item.status === "show" ? (
                  <img
                   height= "150px"
                    width= "150px"
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
        <br/>
        <Stack direction="row" justifyContent="center">
        <Button variant="contained" onClick={() => handleChangeLevel()}>
          Next Level
        </Button>
        </Stack>
      </Box>
    </>
  );
}

export default App;
