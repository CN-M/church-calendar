import { format, isSameDay, isSameMonth, parseISO } from 'date-fns'
import { type Event, type Day } from '~/types/types';

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
            `day ${isDayActive ? 'active' : ''} 
            ${isDayToday ? 'today' : ''} 
            ${isDayInCurrentMonth ? '' : 'disabled'}
            `
          }
          onClick={() => SelectingDay(day)}
        >
          <div className="top-day">
            <span>{format(day, 'd')}</span>
          </div>
          <div className="mid-day">
            {
              events?.filter((event: Event) => isSameDay(parseISO(event.startDatetime), day)).map((event: Event, index: number) => {
                return (
                    <h4 className="name-of-event" key={index}>{event.name}</h4>
                  );
                })
              }
          </div>
          <div className="bottom-day">
        </div>
        </div>
      )
}

export default Days