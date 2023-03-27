import styles from '../styles/Calendar.module.scss'
import { format, isSameDay, isSameMonth, parseISO } from 'date-fns'
import { type Event, type Day } from '~/types/types';

const { active, today, disabled, event } = styles

const Days = ({ isDayActive, isDayToday, isDayInCurrentMonth, day, setSelectedDay, setCurrentMonth, firstDayCurrentMonth, events }: Day) => {
  const SelectingDay = (day: Date) => {
    if (!isSameMonth(day, firstDayCurrentMonth)) {
      setCurrentMonth(format(day, 'MMM-yyyy'))
    }
    setSelectedDay(day)
  }

  return (
      <div
        className={
          `
            ${styles.day} 
            ${isDayActive ? active : ''} 
            ${isDayToday ? today : ''} 
            ${isDayInCurrentMonth ? '' : disabled}
            ${events && events.some((event: Event) => isSameDay(parseISO(event.startDatetime), day)) ? event : ''}
            `
        }
        onClick={() => SelectingDay(day)}
      >
        <div className={styles.topDay}>
          <span>{format(day, 'd')}</span>
        </div>
        <div className={`${styles.midDay} ${styles.smallScreen}`}>
          {
            events?.filter((event: Event) => isSameDay(parseISO(event.startDatetime), day)).map((event: Event, index: number) => {
              return (
                  <h4 className={styles.nameOfEvent} key={index}>{event.name}</h4>
                );
              })
            }
        </div>
        <div className={styles.bottomDay}>
      </div>
      </div>
    )
}

export default Days