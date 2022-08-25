import styles from "./ClearButton.module.css";

const ClearButton = (props) => {
  const clearButtonHandler = () => {
    props.clearButtonHandler();
  };

  return (
    <button className={`${styles["clear-btn"]}`} onClick={clearButtonHandler}>
      {props.buttonName}
    </button>
  );
};

export default ClearButton;
