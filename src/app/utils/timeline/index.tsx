"use client";

import { FC, ReactElement } from "react";
import styles from "./styles.module.css";
import { TimelineProps, TimelineRecord } from "./types";

const Timeline: FC<TimelineProps> = (props): ReactElement => {
  const { data } = props;

  return (
    <>
      {data ? (
        <div className={styles.timeline}>
          {data.map((record: TimelineRecord, index: number) => (
            <div className={styles.milestone} key={index}>
              <div>
                <h3>{record.year}</h3>
              </div>
              <div className={styles.content}>
                <h4>{record.year}</h4>
                <p>{record.description}</p>
                <ul className={styles.tags}>
                  {record.tags.map((tag, tagIndex) => (
                    <li key={tagIndex}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Timeline;
