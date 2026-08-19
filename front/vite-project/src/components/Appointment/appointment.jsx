// ten en cuenta las props que debe recibir y en qué tags del componente quieres poner dicha información.

const Appointment = ({id, date, time, userId, status}) => { // en vez de props coloco desesctruturado las propiedades del objeto para que me aparezca cuando posee el mouse sobre <Appointment/>
    return (
        <>
            <h3>{date}</h3>
            <h3>{time}</h3>
            <h3>{status}</h3>
        </>
    )
} 

export default Appointment;

