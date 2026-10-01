interface Appointment{
    id: string
    date: Date
    time: string
    userId: number // User
    status: Status
}

enum Status{
    active = "active",
    cancelled = "cancelled"
}

export { Appointment, Status };