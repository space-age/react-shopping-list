import ListContainer from "./components/UI/ListContainer.js";
import Form from "./components/NewItem/Form.js";
import List from "./components/List/List.js";
import Author from "./components/General/Author.js";
import ClearButton from "./components/Buttons/ClearButton.js";
import { useState } from "react";

import { LocalStorageUtils } from "./components/Utils/index.js";

function App() {
  const [itemsList, setItemsList] = useState(
    LocalStorageUtils.loadLocalStorage()
  ); // List of items
  const [editMode, setEditMode] = useState(false); // Check if in edit mode
  const [editItem, setEditItem] = useState({ item: "" }); // Item selected while in edit mode
  const [alert, setAlert] = useState({ type: "", text: " " }); // Stores current Alert

  // Variable to check if item list array is empty
  const checkItemListEmpty = itemsList.length === 0 || itemsList === undefined;

  /*
    Passes in the item to be added
    Sets the list of items with the new item added
    Adds the new item to Local Storage
  */
  const addItemHandler = (addItem) => {
    setItemsList((prevItems) => {
      return [...prevItems, addItem];
    });
    LocalStorageUtils.addItemToLocalStorage(
      addItem.id,
      addItem.item,
      addItem.check
    );
    alertHandler("success", `${addItem.item} added to the list`);
  };

  /*
    Passes in the item to be deleted
    Removes the item to be deleted from the list of items
    Deletes the deleted item from Local Storage
  */
  const deleteItemHandler = (deleteItem) => {
    setItemsList(itemsList.filter((item) => deleteItem.id !== item.id));
    LocalStorageUtils.removeItemFromLocalStorage(deleteItem.id);
    editMode && setEditMode(false);
    alertHandler("danger", `${deleteItem.item} removed from list`);
  };

  /*
    Passes in the item to be edited
    If not in edit mode, then set edit mode to true
    Stores the item to be edited in editItem
  */
  const editItemModeHandler = (itemEdit) => {
    // !editMode && setEditMode(true);
    // setEditItem(editItem);
    if (!editMode) {
      setEditItem(itemEdit);
      setEditMode(true);
    }

    editMode &&
      editItem.item &&
      editItem.id === itemEdit.id &&
      setEditMode(false);

    editMode &&
      editItem.id !== itemEdit.id &&
      alertHandler("danger", `${editItem.item} is currently being edit`);
  };

  /*
    Passes in the item name to edit to
    Sets edit Mode to false as it is done editing
    Loops thru the item list, checks if the edit item and current list item IDs match
    If yes, edits the local storage item with the new item name
    And modifies the list item name with the new name
  */
  const editItemHandler = (editItemName) => {
    setEditMode(false);
    setItemsList(
      itemsList.map((item) =>
        //   editItem.id === itemList.id ? { ...itemList, item: itemName } : itemList
        {
          if (item.id === editItem.id) {
            LocalStorageUtils.editItemFromLocalStorage(
              item.id,
              editItemName,
              item.check
            );
            return { ...item, item: editItemName };
          } else return item;
        }
      )
    );
    setEditItem({ item: "" });
    alertHandler(
      "success",
      `${editItem.item} has been changed to ${editItemName}`
    );
  };

  /*
    Passes in the item name to check
    Loops thru the item list, checks if the check item and current list item IDs match
    If yes, edits the local storage item with the new check value
    And modifies the list item check with the new check
  */
  const checkBoxHandler = (checkItem) => {
    setItemsList(
      itemsList.map((item) => {
        if (item.id === checkItem.id) {
          LocalStorageUtils.editItemFromLocalStorage(
            item.id,
            item.item,
            !item.check
          );
          return { ...item, check: !item.check };
        } else return item;
      })
    );
  };

  /*
    Clears the items list by setting to an empty array
    Removes the item "list" from local storage
 */
  const clearButtonHandler = () => {
    setItemsList([]);
    localStorage.removeItem("list");
    editMode && setEditMode(false);
    alertHandler("danger", "All items removed");
  };

  /*
    Takes in two paramaters, type and text
    Sets the Alert to be display
    After some time, it will set the alert back to blank
  */
  const alertHandler = (type = "danger", text = "Handler for blank text") => {
    setAlert({ type: type, text: text });
    setTimeout(function () {
      setAlert({ type: "", text: "" });
    }, 1500);
  };

  return (
    <div className="App">
      <ListContainer>
        <Form
          alertHandler={alertHandler}
          alert={alert}
          editItem={editItem}
          editMode={editMode}
          addItemHandler={addItemHandler}
          editItemHandler={editItemHandler}
        />
        <List
          itemsList={itemsList}
          deleteItemHandler={deleteItemHandler}
          editItemModeHandler={editItemModeHandler}
          checkBoxHandler={checkBoxHandler}
        />
        {!checkItemListEmpty && (
          <ClearButton
            clearButtonHandler={clearButtonHandler}
            buttonName={"clear items"}
          />
        )}
      </ListContainer>
      <Author />
    </div>
  );
}

export default App;
