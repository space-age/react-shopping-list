import ListItem from "./ListItem";

import styles from "./List.module.css";

const List = (props) => {
  const deleteItemHandler = (item) => {
    props.deleteItemHandler(item);
  };

  const editItemModeHandler = (item) => {
    props.editItemModeHandler(item);
  };

  const checkBoxHandler = (item) => {
    props.checkBoxHandler(item);
  };

  return (
    <div className={`${styles["list--container"]}`}>
      <div className={`${styles["list--items"]}`}>
        {props.itemsList.map((item) => (
          <ListItem
            key={item.id}
            checkItem={props.checkItem}
            item={item}
            deleteItemHandler={deleteItemHandler}
            editItemModeHandler={editItemModeHandler}
            checkBoxHandler={checkBoxHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
