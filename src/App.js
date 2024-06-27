import { useState, useEffect } from 'react';
import './App.css';
import MatchingList from './MatchingList';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { shuffleArray, setLevel } from './helper';
import { Button, ButtonGroup, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  height: '150px',
  width: '85%',
  [theme.breakpoints.down('sm')]: {
    height: '70px',
    padding: theme.spacing(0.5),
  },
}));

function App() {
  const [subheader, setSubheader] = useState('Level One');
  const [itemsCount, setItemsCount] = useState(4);
  const [shuffledItems, setShuffledItems] = useState(() => {
    return shuffleArray([...setLevel(MatchingList, itemsCount)]);
  });
  const [matchedItems, setMatchedItems] = useState([]);
  const [isAllMatch, setIsAllMatch] = useState(false);

  useEffect(() => {
    if (matchedItems.length) {
      setTimeout(() => {
        const newList = [...shuffledItems];
        for (let i = 0; i < matchedItems.length; i++) {
          newList.forEach((item) => {
            if (item.name === matchedItems[i].name) item.status = 'matching';
          });
        }
        setShuffledItems(newList);
        checkIfAllMatch();
      }, 500);
    }
  }, [matchedItems]);

  useEffect(() => {
    const level = setLevel(MatchingList, itemsCount);
    setShuffledItems(level);
  }, [subheader]);

  function comparisonItems(item) {
    if (item.status === 'matching') return;
    const newList = [...shuffledItems];
    const filteredItems = newList.filter((i) => i.status === 'show');
    let shownItem = null;
    if (filteredItems.length > 1) {
      filteredItems.forEach((i) => (i.status = 'init'));
    } else if (filteredItems.length === 1) {
      shownItem = filteredItems[0];
    }
    item.status = 'show';
    if (shownItem && shownItem.name === item.name && shownItem.id !== item.id) {
      setMatchedItems([item, shownItem]);
    }
    setShuffledItems(newList);
  }

  const handleChangeLevel = (level, num) => {
    setSubheader(level);
    setItemsCount(num);
  };

  const getAlert = () => {
    setIsAllMatch(true);
    setTimeout(() => {
      setIsAllMatch(false);
    }, 3000);
  };
  const checkIfAllMatch = () => {
    const allMatching = shuffledItems.every((i) => i.status === 'matching');
    allMatching ? getAlert() : setIsAllMatch(false);
  };
  return (
    <>
      <Box>
        <h1 className="header">Matching Game</h1>
      </Box>
      <Stack direction="row" justifyContent="center">
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button onClick={() => handleChangeLevel('Level One', 4)}>Easy</Button>
          <Button onClick={() => handleChangeLevel('Level Two', 6)}>Medium</Button>
          <Button onClick={() => handleChangeLevel('Level Three', 9)}>Hard</Button>
        </ButtonGroup>
      </Stack>

      {isAllMatch && <Alert severity="success">Great Job! you found all matching pictures!</Alert>}

      <Box sx={{ flexGrow: 1 }}>
        <h4 className="subheader">{subheader}</h4>
        <Grid
          container
          justifyContent="center"
          width={{
            xs: '90%',
            sm: '70%',
            md: '60%',
          }}
          margin="auto"
          spacing={{ xs: 1, sm: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {shuffledItems.map((item) => (
            <Grid
              key={item.id}
              xs={1}
              sm={2}
              md={subheader === 'Level Three' ? 2 : 3}
              marginTop="20px">
              <Item
                className={item.status === 'matching' ? 'matched-item' : 'shown-item'}
                onClick={() => {
                  comparisonItems(item);
                }}>
                {item.status === 'show' ? (
                  <div
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '100%',
                    }}></div>
                ) : (
                  ''
                )}
              </Item>
            </Grid>
          ))}
        </Grid>
        <br />
        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            onClick={() => {
              if (subheader === 'Level One') {
                handleChangeLevel('Level Two', 6);
              } else if (subheader === 'Level Two') {
                handleChangeLevel('Level Three', 9);
              } else {
                handleChangeLevel('Level One', 4);
              }
            }}>
            Next Level
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default App;
