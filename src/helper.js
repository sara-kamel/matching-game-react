import { v4 as uuidv4 } from 'uuid';

export function sliceArray(list , num1, num2){
  const sliceList = list.slice(num1, num2);
  const  duplicateList = [...sliceList, ...sliceList]
  const newListWithId = duplicateList.map(item => {
    return { ...item, id: uuidv4()};
  });
return newListWithId ;
}

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    array[i].status = "init";
  }
  return array;
};

export function setLevel(list, subheader ) {
  const NewCopyArray = [...list];
const levelOneItems = sliceArray(NewCopyArray, 0, 3);
const levelTwoItems = sliceArray(NewCopyArray, 0, 6);
const levelThreeItems = sliceArray(NewCopyArray, 0, 8);
const levelFourItems = sliceArray(NewCopyArray, 0, 10);
  let level = null;
  if (subheader === "Level One") {
    level = () => shuffleArray([...levelOneItems]);
  }
  if (subheader === "Level Two") {
    level = () => shuffleArray([...levelTwoItems]);
  }
  if (subheader === "Level Three") {
    level = () => shuffleArray([...levelThreeItems]);
  }
  if (subheader === "Level Four") {
    level = () => shuffleArray([...levelFourItems]);
  }
  console.log(level)
  return level;
}