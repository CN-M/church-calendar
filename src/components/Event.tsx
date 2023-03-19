import React from 'react'

type Event = {
    event: {
        title: string,
        time: string
    }
}

const Event = ({ event: { title, time } } : Event) => {
  return (
    <div className="event">
            <div className="title">
              <i className="fas fa-circle"></i>
              <h3 className="event-title">${title}</h3>
            </div>
            <div className="event-time">
              <span className="event-time">${time}</span>
            </div>
    </div>
  )
}

export default Event