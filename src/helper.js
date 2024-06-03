import { v4 as uuidv4 } from 'uuid';

export function sliceArray(list, num1, num2) {
  const sliceList = list.slice(num1, num2);
  const duplicateList = [...sliceList, ...sliceList];
  const newListWithId = duplicateList.map((item) => {
    return { ...item, id: uuidv4() };
  });
  return newListWithId;
}

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    array[i].status = 'init';
  }
  return array;
};

export function setLevel(list, num) {
  const NewCopyArray = [...list];
  const levelItems = sliceArray(NewCopyArray, 0, num);
  return shuffleArray([...levelItems]);
}
