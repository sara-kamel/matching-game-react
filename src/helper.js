export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      array[i].status = "init";
    }
    return array;
  };
  
export function findShownItem(list){
  const item =list.find(item => item.status === "show")
  return item;

}