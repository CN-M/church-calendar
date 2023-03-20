import { type FormEvent, useState, type KeyboardEventHandler, type ChangeEvent } from "react"
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

  const modifyInput = (e: ChangeEvent<HTMLInputElement>) => {
    // const modifyInput = (e: KeyboardEventHandler<HTMLInputElement>) => {
      if (e.target.value.length === 2)  {
        e.target.value = e.target.value + ':'
      } else if (e.target.value.length === 3 && e.target.value.charAt(2) === ':') {
        e.target.value = e.target.value.replace(':', '');
      }
    }

  return (
    <form onSubmit={handleAddEvent}>
            <div className="add-event-body">
              <div className="add-event-input">
                <input 
                  type="text" 
                  placeholder="Event Name" 
                  className="event-name" 
                  maxLength={50}
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                  />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Event Time From"
                  className="event-time-from"
                  maxLength={5}
                  value={eventStartTime}
                  onKeyUp={modifyInput}
                  onChange={(e) => setEventStartTime(e.target.value)}
                  required
                  />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Event Time To"
                  className="event-time-to"
                  maxLength={5}
                  value={eventEndTime}
                  onChange={(e) => setEventEndTime(e.target.value)}
                  onKeyUp={modifyInput}
                  required
                  />
              </div>
            </div>
            <div className="add-event-footer">
              <button 
                className="add-event-btn">Add Event</button>
            </div>
          </form>
  )
}

export default AddEventForm;