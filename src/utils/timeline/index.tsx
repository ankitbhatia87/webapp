import { FC, ReactElement } from "react";
import styles from "./assets/styles.module.css";
import { TimelineProps, TimelineRecord } from "./types";

const Timeline: FC<TimelineProps> = (props): ReactElement => {
  const { data } = props;

  return (
    <>
      {data ? (
        <div className={styles.timeline}>
          {data.map((record: TimelineRecord) => (
            <div className={styles.milestone}>
              <h3>{record.year}</h3>
              <p>{record.description}</p>
              <ul className={styles.tags}>
                {record.tags.map((tag) => (
                  <li>{tag}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Timeline;
