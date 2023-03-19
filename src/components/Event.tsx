import React from 'react'
import { format, parseISO } from 'date-fns'
import { FaCircle, FaTimes } from 'react-icons/fa'

import { type userSessionData } from '~/types/types'
type Event = {
    event: {
        id: string,
        name: string,
        startDatetime: string,
        endDatetime: string
    },
    handleDeleteEvent: (id: string) => void,
    sessionData: userSessionData | null
}

const Event = ({ event: { id, name, startDatetime, endDatetime }, handleDeleteEvent, sessionData } : Event) => {

  const handleDeletion = (id: string) => {
    handleDeleteEvent(id)
  }

    return (
      <div className="event" key={id} onClick={() => handleDeleteEvent(id)}>
        {/* {sessionData?.user?.role === 'admin' && (
          <button className="delete-event" onClick={() => handleDeleteEvent(id)}>
            <FaTimes />
          </button>
        )} */}
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