import styles from "./Author.module.css";

const Author = () => {
  return (
    <div className={`${styles["author--container"]}`}>
      <h2>
        Creator:
        <span className={`${styles["author--name"]}`}>
          {" "}
          Christopher Casillas
        </span>
      </h2>
    </div>
  );
};

export default Author;
