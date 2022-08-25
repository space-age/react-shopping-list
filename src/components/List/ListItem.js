import styles from "./ListItem.module.css";

import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

const ListItem = (props) => {
  const itemToCapital = (
    props.item.item.charAt(0).toUpperCase() + props.item.item.slice(1)
  ).trim();

  const deleteItemHandler = () => {
    props.deleteItemHandler(props.item);
  };

  const editItemModeHandler = () => {
    window.scroll(0, 0); //pushes window to the top
    props.editItemModeHandler(props.item);
  };

  const checkBoxHandler = () => {
    props.checkBoxHandler(props.item);
  };

  return (
    <article data-id="{id}" className={`${styles["list-item"]}`}>
      <div className={`${styles["list-item--checkbox"]}`}>
        <input
          type="checkbox"
          id={props.item.id}
          onClick={checkBoxHandler}
          defaultChecked={props.item.check ? true : false}
        />
        <label htmlFor={props.item.id} data-content={itemToCapital}>
          {itemToCapital}
        </label>
      </div>
      <div className={`${styles["list-item--btn-container"]}`}>
        <button
          onClick={editItemModeHandler}
          type="button"
          className={`${styles["list-item--edit-btn"]}`}
        >
          <PencilAltIcon className={`${styles["list-item--edit-icon"]}`} />
        </button>
        <button
          onClick={deleteItemHandler}
          type="button"
          className={`${styles["list-item--delete-btn"]}`}
        >
          <TrashIcon className={`${styles["list-item--delete-icon"]}`} />
        </button>
      </div>
    </article>
  );
};

export default ListItem;
