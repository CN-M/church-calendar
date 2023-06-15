import { type FormEvent, useState, type KeyboardEvent } from "react"
import { FaChevronRight, FaChevronLeft, FaTimes, FaPlus } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { api } from "src/utils/api";
import { toast } from "react-hot-toast";
import styles from '../styles/Calendar.module.scss'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'

import AddEventForm from "./AddEventForm";
import Event from "./Event";
import Days from "./Days";

const Calendar = () => {

  const trpc = api.useContext()

  const events = api.event.getAllEvents.useQuery()

  const { mutate: deleteEvent } = api.event.deleteEvent.useMutation({
    onError(err) {
      if (err.message === 'UNAUTHORIZED') {
        toast.error('You are not authorized to delete this event')
      }
    },
    onMutate: async () => await trpc.event.getAllEvents.cancel(),
    onSettled: async () => await trpc.event.getAllEvents.invalidate()
  })

  const today = startOfToday()

  const [addEventModal, setAddEventModal] = useState(false)
  const [desiredDate, setDesiredDate] = useState('')
  const [selectedDay, setSelectedDay] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))

  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })
 
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

  const goToDate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const date = parse(desiredDate, 'MM/yyyy', new Date())
    if (date) {
      setCurrentMonth(format(date, 'MMM-yyyy'))
    }
  }

  const selectedDayEvents = events.data?.filter((event) =>
    isSameDay(parseISO(event.startDatetime), selectedDay)
  )

  const { data: sessionData } = useSession();

  const isPermitted = sessionData?.user?.role === 'ARCHITECT' || sessionData?.user?.role === 'EDITOR'

  const handleDeleteEvent = (id: string) => {
    if (isPermitted) {
      if (confirm("Are you sure you want to delete this event?")) {
        deleteEvent({ id })
      }
    }
  }

  const modifyInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 2)  {
      e.currentTarget.value = e.currentTarget.value + '/'
    } else if (e.currentTarget.value.length === 3 && e.currentTarget.value.charAt(2) === '/') {
      e.currentTarget.value = e.currentTarget.value.replace('/', '');
    }

    setDesiredDate(e.currentTarget.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.calendar}>
          <div className={styles.month}>
          <FaChevronLeft onClick={prevMonth} />
          <div className={styles.date}>{format(firstDayCurrentMonth, 'MMMM yyyy')}</div>
          <FaChevronRight onClick={nextMonth} />
          </div>
          <div className={styles.weekdays}>
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className={styles.days}>
            {
              days.map((day, index) => {
                const isDayActive = isSameDay(day, selectedDay)
                const isDayToday = isToday(day)
                const isDayInCurrentMonth = isSameMonth(day, firstDayCurrentMonth)

                return (
                  <Days 
                    key={index}
                    day={day}
                    isDayActive={isDayActive}
                    isDayToday={isDayToday}
                    isDayInCurrentMonth={isDayInCurrentMonth}
                    setSelectedDay={setSelectedDay}
                    setCurrentMonth={setCurrentMonth}
                    firstDayCurrentMonth={firstDayCurrentMonth}
                    events={events.data || []}
                  />
                )
              })
            }
          </div>
          <div className={styles.gotoToday}>
            {/* <div /> */}
            <form onSubmit={goToDate}>
              <div className={styles.goto}>
                  <input 
                    type="text" 
                    placeholder="mm/yyyy"
                    className={styles.dateInput} 
                    onKeyUp={modifyInput}
                    maxLength={7}
                    />
                  <button type="submit" className={styles.gotoBtn}>Go</button>
              </div>
            </form>
            <button 
              className={styles.todayBtn}
              onClick={goToToday}
              >
              Today
              </button>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.todayDate}>
          <div className={styles.eventDay}>
            <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
              { format(selectedDay, 'EE') }
            </time>
          </div>
          <div className={styles.eventDate}>
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'do MMMM yyy')}
              </time>
          </div>
        </div>
        <div className={styles.events}>
          {
            selectedDayEvents !== undefined && selectedDayEvents?.length > 0 
            ? (
              selectedDayEvents?.map((event, idx) => {
                return (
                  <Event
                    key={idx}
                    event={event} 
                    handleDeleteEvent={handleDeleteEvent} 
                    />
                )
              })
            ) : (
              <div className={styles.noEvent}>
                <h3>No Events</h3>
              </div>
            )
          }
        </div>
        <div className={`${styles.addEventWrapper} ${addEventModal ? styles.active : ''}`}>
          <div className={styles.addEventHeader}>
            <div className={styles.title}>Add Event</div>
            <FaTimes className={styles.close} onClick={handleModal} />
          </div>
          <AddEventForm selectedDay={selectedDay}  handleModal={handleModal} />
        </div>
      </div>
      {
        isPermitted && (
      <button className={styles.addEvent} onClick={handleModal}>
        <FaPlus />
      </button>
        )
      }
    </div>
  )
}

export default Calendar;
