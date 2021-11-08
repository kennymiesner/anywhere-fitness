import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { cancelClass } from '../../actions/reserveActions';
import { editClass } from '../../actions/classActions';

const Bookings = props => {
    const history = useHistory();
    const [booked, setBooked] = useState(false);

    const handleDetails = (item) => {
        history.push(`../class/${item.name}`);
    }

    const handleCancel = (item) => {
        props.cancelClass(item);
        props.editClass(item);
    }

    useEffect(() => {
        if (props.bookedClasses !== []) {
            props.bookedClasses.forEach(item => {
                if (localStorage.getItem("email") === item.email) {
                    setBooked(true);
                    return;
                }
            })
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="booking-wrapper">
            <div className="booking-container">
                {
                    props.bookedClasses !== [] ? props.bookedClasses.map((item, index) => (
                        <div key={index} >
                            {
                                (localStorage.getItem("email") === item.email) &&
                                <div className="booked-card">
                                    <h2 onClick={() => handleDetails(item)}>{item.name}</h2>
                                    <p>{item.date}</p>
                                    <p>{item.start_time}</p>
                                    <h3>Status: booked</h3>
                                    <div>
                                        <button onClick={() => handleCancel(item)} className="cancel-btn">Cancel Class</button>
                                    </div>
                                </div>
                            }

                        </div>)) : <h2 className="booking-message">No booked classes</h2>
                }
            </div>

            {
                !booked && <h2 className="booking-message">No booked classes</h2>
            }
        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        bookedClasses: state.reserveReducer.bookedClasses,
        classes: state.classesReducer.classes,
    }
}

export default connect(mapStateToProps, { cancelClass, editClass })(Bookings);

