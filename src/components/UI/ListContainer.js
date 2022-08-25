import styles from "./ListContainer.module.css";

const ListContainer = (props) => {
  const classes = `${styles["list--container"]}`;

  return <div className={classes}>{props.children}</div>;
};

export default ListContainer;
