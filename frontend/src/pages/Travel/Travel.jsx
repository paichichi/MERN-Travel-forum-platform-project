import React from "react";
import styles from "./Travel.module.css";
import { Outlet } from "react-router-dom";

const Travel = (props) => (
  <div className={styles.page}>
    <Outlet />
  </div>
);

export default Travel;
