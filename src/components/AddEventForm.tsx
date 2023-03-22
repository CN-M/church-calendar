import styles from '../styles/Calendar.module.scss'
import { type FormEvent, useState, type KeyboardEvent } from "react"
import { api } from "~/utils/api";

import { format } from 'date-fns'

import { type EventFormInput } from "~/types/types";

const AddEventForm = ({ selectedDay, handleModal } : EventFormInput) => {

  const trpc = api.useContext()

  const [eventName, setEventName] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  
  const  { mutate: createEvent } = api.event.createEvent.useMutation({
    onMutate: async () => await trpc.event.getAllEvents.cancel(),
    onSettled: async () => await trpc.event.getAllEvents.invalidate()
  })

  const handleAddEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const event = {
      name: eventName,
      startDatetime: `${format(selectedDay, 'yyyy-MM-dd')}T${eventStartTime}:00.000Z`,
      endDatetime: `${format(selectedDay, 'yyyy-MM-dd')}T${eventEndTime}:00.000Z`
    }

    createEvent(event)

    setEventEndTime('')
    setEventName('')
    setEventStartTime('')
    
    handleModal()
  }

    const modifyInput = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.currentTarget.value.length === 2)  {
        e.currentTarget.value = e.currentTarget.value + ':';
      } else if (e.currentTarget.value.length === 3 && e.currentTarget.value.charAt(2) === ':') {
        e.currentTarget.value = e.currentTarget.value.replace(':', '');
      }
    }
    

  return (
    <form onSubmit={handleAddEvent}>
            <div className={styles.addEventBody}>
              <div className={styles.addEventInput}>
                <input 
                  type="text" 
                  placeholder="Event Name" 
                  className={styles.eventName} 
                  maxLength={50}
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                  />
              </div>
              <div className={styles.addEventInput}>
                <input
                  type="text"
                  placeholder="Event Time From"
                  className={styles.eventTimeFrom}
                  maxLength={5}
                  value={eventStartTime}
                  onKeyUp={modifyInput}
                  onChange={(e) => setEventStartTime(e.target.value)}
                  required
                  />
              </div>
              <div className={styles.addEventInput}>
                <input
                  type="text"
                  placeholder="Event Time To"
                  className={styles.eventTimeTo}
                  maxLength={5}
                  value={eventEndTime}
                  onChange={(e) => setEventEndTime(e.target.value)}
                  onKeyUp={modifyInput}
                  required
                  />
              </div>
            </div>
            <div className={styles.addEventFooter}>
              <button 
                className={styles.addEventBtn}>Add Event</button>
            </div>
          </form>
  )
}

export default AddEventForm;