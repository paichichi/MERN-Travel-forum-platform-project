import React from "react";
import styles from "../../../pages/Travel/Travel.module.css";
export default function PlanList(planDisplays) {
  return (
    <div
      className={styles.search_ContainerView}
      style={{ height: "20vh", overflowY: "scroll" }}
    >
      {planDisplays
        ? planDisplays.planDisplays?.map((item, index) => {
            return (
              <div key={index} className={styles.tripContainerView}>
                <div
                  style={{
                    textAlign: "left",
                  }}
                >
                  <span className={styles.tripHeaderView}>
                    Destination {index + 1} | {item.destination} | {item.arrive}{" "}
                    ~ {item.leave}{" "}
                  </span>
                  <br />
                  <span>Accomodation------------{item.accomodation}</span>
                  <br />
                  <span>Check in------------{item.arrive}</span>
                  <br />
                  <span>Check out------------{item.leave}</span>
                  <br />
                  <span>Price------------${item.price}</span>
                </div>
              </div>
            );
          })
        : "No plans yet"}
      ;
    </div>
  );
}
