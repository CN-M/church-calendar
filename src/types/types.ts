export type Event = {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    name: string;
    startDatetime: string;
    endDatetime: string;
    // user: User;
};

export type EventFormInput = {
    selectedDay: Date,
    handleModal: () => void
}

export type Day = {
    isDayActive: boolean,
    isDayToday: boolean,
    isDayInCurrentMonth: boolean,
    day: Date,
    setSelectedDay: (day: Date) => void,
    events: Event[]
    // events: {
    //     data: Event[]
    // }
}