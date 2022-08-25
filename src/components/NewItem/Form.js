import { useState } from "react";
import Title from "../General/Title.js";
import Alert from "../Alert/Alert.js";

import styles from "./Form.module.css";

const Form = (props) => {
  const [enteredItem, setEnteredItem] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    if (enteredItem !== "") {
      const itemData = {
        id: new Date().getTime().toString(),
        item: enteredItem,
        check: false,
      };
      props.addItemHandler(itemData);
    }
    !enteredItem && props.alertHandler("danger", "Please enter Value");
    setEnteredItem("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    enteredItem && props.editItemHandler(enteredItem);
    !enteredItem && props.alertHandler("danger", "Please enter Value");
    setEnteredItem("");
  };

  const classInputEditMode = props.editMode
    ? "from--input-item--editMode"
    : " ";

  const classButtonEditMode = props.editMode
    ? "form--submit-btn--editMode"
    : " ";

  return (
    <form onSubmit={props.editMode ? handleEditSubmit : handleSumbit}>
      <Title title="react-JS shopping list" />
      <Alert alert={props.alert} />
      <div className={`${styles["form--submission"]}`}>
        <input
          type="text"
          className={`${styles["form--input-item"]} ${
            styles[`${classInputEditMode}`]
          }`}
          id="item"
          placeholder={props.editMode ? props.editItem.item : "e.g. juice"}
          value={enteredItem}
          maxLength="40"
          onChange={(e) => setEnteredItem(e.target.value)}
        />
        <button
          type="submit"
          id="submit"
          className={`${styles["form--submit-btn"]} ${
            styles[`${classButtonEditMode}`]
          }`}
        >
          {props.editMode ? "Edit" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;

//////////////////////////////////////////

// const enteredItem = useRef();

// /*
// Add item Form submission handler
// If value was entered in input form, create an object with the item data
// If no value entered,and form submitted, then display alert
// Set the value back to blank
// */
// const handleSumbit = useCallback((event) => {
//   event.preventDefault();
//   if (enteredItem.current.value !== "") {
//     const itemData = {
//       id: new Date().getTime().toString(),
//       item: enteredItem.current.value,
//       check: false,
//     };
//     props.addItemHandler(itemData);
//   }
//   !enteredItem.current.value &&
//     props.alertHandler("danger", "Please enter Value");
//   enteredItem.current.value = "";
// }, []);

// /*
// Edit item Form submission handler
// If value was entered in input form, then pass the value to editItemHandler
// If no value entered,and form submitted, then display alert
// Set the value back to blank
// */
// const handleEditSubmit = useCallback((event) => {
//   event.preventDefault();
//   enteredItem.current.value &&
//     props.editItemHandler(enteredItem.current.value);
//   !enteredItem.current.value &&
//     props.alertHandler("danger", "Please enter Value");
//   enteredItem.current.value = "";
// }, []);

/* <input
type="text"
className={`${styles["form--input-item"]}`}
// className={`${styles["form--input-item"]} ${
//   styles[`${classInputEditMode}`]
// }`}
id="item"
ref={enteredItem}
placeholder="e.g. juice"
/> */
