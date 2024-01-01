const insertItemArray = (arr, index, ...newItems) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted items
  ...newItems,
  // part of the array after the specified index
  ...arr.slice(index),
];

const getFormattedDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
};

const handleTextChangeEvent = (event, setMethod) => {
  setMethod(event.target.value);
};

export {  insertItemArray, 
          getFormattedDate, 
          handleTextChangeEvent };
