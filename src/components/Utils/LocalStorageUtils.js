/*
  Adds item in local storage
*/
export const addItemToLocalStorage = (id, item, check = false) => {
  const list = { id, item, check };
  let items = getLocalStorage();
  items.push(list);
  localStorage.setItem("list", JSON.stringify(items));
};

/*
  Removes item from local storage 
*/
export const removeItemFromLocalStorage = (id) => {
  let items = getLocalStorage();
  items = items.filter((item) => item.id !== id);
  localStorage.setItem("list", JSON.stringify(items));
};

/*
  Edits item in local storage
*/
export const editItemFromLocalStorage = (id, value, check) => {
  let items = getLocalStorage();
  items = items.map((item) => {
    item.id === id && item.item !== value && (item.item = value);
    item.id === id && typeof check !== "undefined" && (item.check = check);
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
};

/*
  Gets local storage and returns it as an object
*/
export const loadLocalStorage = () => {
  let items = getLocalStorage();
  if (items.length > 0) return items;
  return [];
};

/*
  Gets the local storage
*/
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
