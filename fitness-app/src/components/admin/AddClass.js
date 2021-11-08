import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addClass } from '../../actions/classActions';
import { v4 as uuidv4 } from 'uuid';

const AddClass = props => {
    const initialValues = {
        name: "",
        type: "",
        date: "",
        start_time: "",
        duration: "",
        intensity: "",
        location: "",
        enrolled: 0,
        max_capacity: "",
        instructor_id: "",
        id: uuidv4(),
    };

    const [newClass, setNewClass] = useState(initialValues);
    const history = useHistory();

    const onSubmit = e => {
        e.preventDefault();
        props.addClass(newClass);
        history.push('/class-admin');
    }

    const onChange = e => {
        const { name, value } = e.target;
        setNewClass({
            ...newClass,
            [name]: value,
        });
    }

    return (
        <div className="addClass-wrapper">
            <div className="form-wrapper-class">
                <form onSubmit={onSubmit}>
                    <div className="form-body">
                        <div className="form-group">
                            <label>Name </label>
                            <input
                                value={newClass.name}
                                onChange={onChange}
                                name="name"
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Instructor id </label>
                            <input
                                value={newClass.instructor_id}
                                onChange={onChange}
                                name="instructor_id"
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Type </label>
                            <input
                                value={newClass.type}
                                onChange={onChange}
                                name="type"
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Intensity </label>
                            <input
                                value={newClass.intensity}
                                onChange={onChange}
                                name="intensity"
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Loaction </label>
                            <input
                                value={newClass.location}
                                onChange={onChange}
                                name="location"
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Max Size </label>
                            <input
                                value={newClass.max_capacity}
                                onChange={onChange}
                                name="max_capacity"
                                type="number"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Date </label>
                            <input
                                value={newClass.date}
                                onChange={onChange}
                                name="date"
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Time </label>
                            <input
                                value={newClass.start_time}
                                onChange={onChange}
                                name="start_time"
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration </label>
                            <input
                                value={newClass.duration}
                                onChange={onChange}
                                name="duration"
                                type="number"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-submit">
                        <input type="submit" className="submit-btn" value="Add" />
                    </div>
                </form>
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        classes: state.classesReducer.classes,
    }
}

export default connect(mapStateToProps, { addClass })(AddClass);