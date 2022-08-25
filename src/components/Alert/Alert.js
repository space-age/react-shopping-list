import styles from "./Alert.module.css";

const Alert = (props) => {
  const classAlert =
    props.alert.type === "success"
      ? "alert-success"
      : props.alert.type === "danger"
      ? "alert-danger"
      : // : props.alert.type === "" && props.alert.text === ""
        // ? "alert-other"
        "";

  return (
    <p className={`${styles.alert} ${styles[`${classAlert}`]}`}>
      {props.alert.text}
    </p>
  );
};

export default Alert;
