import { type User } from '@prisma/client'

export type Event = {
    id: string;
    name: string;
    startDatetime: string;
    endDatetime: string;
    user?: User & { id: string };
    userId: string;
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
    setCurrentMonth: (month: string) => void,
    firstDayCurrentMonth: Date,
    events: Event[]
}

export type Payment = {
    token: string;
    amountInCents: number;
};