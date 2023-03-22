import styles from '../styles/Calendar.module.scss';
import React from 'react';
import { format, parseISO } from 'date-fns';
// import { utcToZonedTime } from 'date-fns-tz'
import { FaCircle } from 'react-icons/fa';

type Event = {
  event: {
    id: string;
    name: string;
    startDatetime: string;
    endDatetime: string;
    user?: string;
  };
  handleDeleteEvent: (id: string) => void;
};

const Event = ({ event: { id, name, startDatetime, endDatetime }, handleDeleteEvent }: Event) => {
  const startTime = format(parseISO(startDatetime), 'HH:mm a');
  // const startTime = format(utcToZonedTime(parseISO(startDatetime)), 'HH:mm a');
  const endTime = format(parseISO(endDatetime), 'HH:mm a');
  // const endTime = format(utcToZonedTime(parseISO(endDatetime)), 'HH:mm a');

  return (
    <div className={styles.event} key={id} onDoubleClick={() => handleDeleteEvent(id)}>
      <div className={styles.title}>
        <FaCircle />
        <h3 className={styles.eventTitle}>{name}</h3>
      </div>
      <div className={styles.eventTime}>
        <span className={styles.eventTime}>
          <time dateTime={startDatetime}>{startTime}</time>
          <span> - </span>
          <time dateTime={endDatetime}>{endTime}</time>
        </span>
      </div>
    </div>
  );
};

export default Event;
