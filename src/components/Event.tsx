import React from 'react'
import { format, parseISO } from 'date-fns'
import { FaCircle } from 'react-icons/fa'

type Event = {
    event: {
        id: string,
        name: string,
        startDatetime: string,
        endDatetime: string,
        user?: string
    },
    handleDeleteEvent: (id: string) => void,
}

const Event = ({ event: { id, name, startDatetime, endDatetime }, handleDeleteEvent } : Event) => {
    return (
      <div className="event" key={id} onDoubleClick={() => handleDeleteEvent(id)} >
        <div className="title">
          <FaCircle />
          <h3 className="event-title">{name}</h3>
        </div>
        <div className="event-time">
          <span className="event-time">
            <time dateTime={startDatetime}>
              {format(parseISO(startDatetime), 'hh:mm a')}
            </time>
          <span> - </span>
            <time dateTime={endDatetime}>
              {format(parseISO(endDatetime), 'hh:mm a')}
            </time>
          </span>
        </div>
      </div>
  )
}

export default Event