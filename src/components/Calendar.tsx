import { type ChangeEvent, type FormEvent, useState } from "react"
import { FaChevronRight, FaChevronLeft, FaTimes, FaPlus, FaCircle } from 'react-icons/fa'
// import { MdDeleteForever } from 'react-icons/md'
import { api } from "~/utils/api";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  format,
  // subMonths,
  // addMonths,
  // getDay,
  // isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'

import AddEventForm from "./AddEventForm";

const Calendar = () => {

  const trpc = api.useContext()

  const events = api.event.getAllEvents.useQuery()

  const { mutate } = api.event.deleteEvent.useMutation({
    onMutate: async () => await trpc.event.getAllEvents.cancel(),
    onSettled: async () => await trpc.event.getAllEvents.invalidate()
  })
  
  const today = startOfToday()

  const [addEventModal, setAddEventModal] = useState(false)
  const [desiredDate, setDesiredDate] = useState('')
  const [selectedDay, setSelectedDay] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))

  // const [monthBefore, setMonthBefore] = useState(format(subMonths(today, 1), 'MMM-yyyy'));
  // const [monthAfter, setMonthAfter] = useState(format(addMonths(today, 1), 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  // const updateMonths = (currentMonth: string) => {
  //   const prevMonth = format(subMonths(parse(currentMonth, 'MMM-yyyy', new Date()), 1), 'MMM-yyyy')
  //   const nextMonth = format(addMonths(parse(currentMonth, 'MMM-yyyy', new Date()), 1), 'MMM-yyyy')
  //   setMonthBefore(prevMonth)
  //   setMonthAfter(nextMonth)
  // }
  
  // const prevMonth = () => {
  //   const firstDayPrevMonth = subMonths(parse(firstDayCurrentMonth, 'MMM-yyyy', new Date()), 1)
  //   setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'))
  //   updateMonths(format(firstDayPrevMonth, 'MMM-yyyy'))
  // }
  
  // const nextMonth = () => {
  //   const firstDayNextMonth = addMonths(parse(firstDayCurrentMonth, 'MMM-yyyy', new Date()), 1)
  //   setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  //   updateMonths(format(firstDayNextMonth, 'MMM-yyyy'))
  // }

  const prevMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }
  
  const goToToday = () => {
    const today = startOfToday()
    setSelectedDay(today)
    setCurrentMonth(format(today, 'MMM-yyyy'))
  }

  const handleModal = () => {
    setAddEventModal(!addEventModal)
  }

  // const handleCloseModal = () => {
  //   setAddEventModal(false)
  // }

  const handleDateChange = (e: ChangeEvent<HTMLInputElement> & { inputType: string }) => {
    e.target.value = e.target.value.replace(/[^0-9/]/g, "");
    if (e.target.value.length === 2) {
      e.target.value += '/';
    }
  
    if (e.inputType === 'deleteContentBackward' || e.inputType === 'deleteContentForward') {
      if (e.target.value.length === 3) {
        e.target.value = e.target.value.slice(0, 2);
      }
    }
  
    setDesiredDate(e.target.value);
  };
 
  const goToDate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const date = parse(desiredDate, 'MM/yyyy', new Date())
    if (date) {
      setCurrentMonth(format(date, 'MMM-yyyy'))
    }
  }

  // if (selectedDay && isSameMonth(selectedDay, parse(monthBefore, 'MMM-yyyy', new Date()))) {
  //   prevMonth()
  // }

  // if (selectedDay && isSameMonth(selectedDay, parse(monthAfter, 'MMM-yyyy', new Date()))) {
  //   nextMonth()
  // }

  const selectedDayEvents = events.data?.filter((event) =>
    isSameDay(parseISO(event.startDatetime), selectedDay)
  )

  const handleDeleteEvent = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      mutate({ id })
    }
  }


  return (
    <div className="container">
      <div className="left">
        <div className="calendar">
          <div className="month">
          <FaChevronLeft onClick={prevMonth} />
          <div className="date">{format(firstDayCurrentMonth, 'MMMM yyyy')}</div>
          <FaChevronRight onClick={nextMonth} />
          </div>
          <div className="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="days">
            {
              days.map((day, index) => {
                const isDayActive = isSameDay(day, selectedDay)
                const isDayToday = isToday(day)
                const isDayInCurrentMonth = isSameMonth(day, firstDayCurrentMonth)

                return (
                  <div
                    key={index}
                    className={
                      `day ${isDayActive ? 'active' : ''} 
                      ${isDayToday ? 'today' : ''} 
                      ${isDayInCurrentMonth ? '' : 'disabled'}
                      `
                    }
                    onClick={() => setSelectedDay(day)}
                  >
                    <div className="top-day">
                      <span>{format(day, 'd')}</span>
                    </div>
                    <div className="mid-day">
                      {
                        events.data?.filter((event) => isSameDay(parseISO(event.startDatetime), day)).map((event, index) => {
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
              })
            }
          </div>
          <div className="goto-today">
            {/* <div /> */}
            <form onSubmit={goToDate}>
              <div className="goto">
                  <input 
                    type="text" 
                    placeholder="mm/yyyy"
                    className="date-input" 
                    onChange={handleDateChange}
                    maxLength={7}
                    />
                  <button type="submit" className="goto-btn">Go</button>
              </div>
            </form>
            <button 
              className="today-btn"
              onClick={goToToday}
              >
              Today</button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="today-date">
          <div className="event-day">
            <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
              { format(selectedDay, 'EE') }
            </time>
          </div>
          <div className="event-date">
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'do MMMM yyy')}
              </time>
          </div>
        </div>
        <div className="events">
          {
            selectedDayEvents !== undefined && selectedDayEvents?.length > 0 
            ? (
              selectedDayEvents?.map((event) => {
                return (
                  <div className="event" key={event.id} onClick={() => handleDeleteEvent(event.id)}>
                    <div className="title">
                      <FaCircle />
                      <h3 className="event-title">{event.name}</h3>
                    </div>
                    <div className="event-time">
                      <span className="event-time">
                        <time dateTime={event.startDatetime}>
                          {format(parseISO(event.startDatetime), 'hh:mm a')}
                        </time>
                      <span> - </span>
                        <time dateTime={event.endDatetime}>
                          {format(parseISO(event.endDatetime), 'hh:mm a')}
                        </time>
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="no-event">
                <h3>No Events</h3>
              </div>
            )
          }
        </div>
        <div className={`add-event-wrapper ${addEventModal ? 'active' : ''}`}>
          <div className="add-event-header">
            <div className="title">Add Event</div>
            <FaTimes className='close' onClick={handleModal} />
          </div>
          <AddEventForm selectedDay={selectedDay}  handleModal={handleModal} />
        </div>
      </div>
      <button className="add-event" onClick={handleModal}>
        <FaPlus />
      </button>
    </div>
  )
}

export default Calendar;