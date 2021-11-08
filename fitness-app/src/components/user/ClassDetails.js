import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { reserveClass } from "../../actions/reserveActions";
import { editClass } from '../../actions/classActions';

function ClassDetails(props) {
    const [item, setItem] = useState({});
    const [full, setFull] = useState(false);
    const [bookedMessage, setBookedMessage] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const find_item = props.classes.find(item => item.name === id)
        setItem(find_item);
        setFull(false);
        setBookedMessage(false);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleReserve = () => {
        if (item.enrolled < item.max_capacity) {
            let inlist = false;
            if (props.bookedClasses.length > 0) {
                props.bookedClasses.forEach((element) => {
                    if (element.id === item.id && localStorage.getItem("email") === element.email) {
                        inlist = true;
                    }
                })
            }
            if (inlist) {
                setBookedMessage(true);
            } else {
                props.reserveClass({ ...item, email: localStorage.getItem("email") });
                const updatedClass = {
                    name: item.name,
                    type: item.type,
                    date: item.date,
                    start_time: item.start_time,
                    duration: item.duration,
                    intensity: item.intensity,
                    location: item.location,
                    enrolled: item.enrolled + 1,
                    max_capacity: item.max_capacity,
                    instructor_id: item.instructor_id,
                    id: item.id,
                }
                props.editClass(updatedClass);
                history.push('../../bookings');
            }
        } else {
            setFull(true);
        }
    }

    return (
        <div className="class-details-wrapper">
            <h2><span>{item.name}</span></h2>
            <p>Type: <span>{item.type}</span></p>
            <p>Intensity: <span>{item.intensity}</span></p>
            <p>Location: <span>{item.location}</span></p>
            <p>Date: {item.date}</p>
            <p>Time: {item.start_time}</p>
            <p>Duration: {item.duration} days</p>
            <p>Reservation: {item.enrolled}/{item.max_capacity}</p>
            <button onClick={handleReserve} className="reserve-btn">Reserve</button>
            <Link to={`/class`}><button className="back-btn">Back</button></Link>
            {full && <p className="full-message">This class is fully booked</p>}
            {bookedMessage && <p className="booked-message">You have already booked this class</p>}
        </div >
    )
}

const mapStateToProps = state => {
    return {
        classes: state.classesReducer.classes,
        bookedClasses: state.reserveReducer.bookedClasses,
    }
}

export default connect(mapStateToProps, { reserveClass, editClass })(ClassDetails);