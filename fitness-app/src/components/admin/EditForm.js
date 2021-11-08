import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { editClass, deleteClass } from '../../actions/classActions';
import { cancelClass } from '../../actions/reserveActions';
import DeleteClassModal from "./DeleteClassModal";

const EditForm = (props) => {
    const initialValues = {
        name: props.item.name,
        type: props.item.type,
        intensity: props.item.intensity,
        location: props.item.location,
        max_capacity: props.item.max_capacity,
        date: props.item.date,
        start_time: props.item.start_time,
        duration: props.item.duration,
        enrolled: props.item.enrolled,
        instructor_id: props.item.instructor_id,
        id: props.item.id,
    };
    const [editItem, setEditItem] = useState(initialValues);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const updateForm = (inputName, inputValue) => {
        setEditItem({
            ...editItem,
            [inputName]: inputValue,
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        updateForm(name, value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        props.editClass(editItem);
        history.push("/class-admin");
    };

    // const handleDelete = (e) => {
    //     e.preventDefault();
    //     props.deleteClass(editItem.id);
    //     props.bookedClasses.forEach((item) => {
    //         if (item.id === editItem.id) {
    //             props.cancelClass(item);
    //         }
    //     })
    //     history.push("/class-admin");
    // };

    const handleDelete = () => {
        setShowModal(true);
    }

    const handleYesFunc = () => {
        props.deleteClass(editItem.id);
        props.bookedClasses.forEach((item) => {
            if (item.id === editItem.id) {
                props.cancelClass(item);
            }
        })
        history.push("/class-admin");
    }

    const handleNoFunc = () => {
        setShowModal(false);
    }

    return (
        <div className="form-wrapper-class">
            <form onSubmit={onSubmit}>
                <div className="form-body">
                    <div className="form-group">
                        <label>Name </label>
                        <input
                            value={editItem.name}
                            onChange={onChange}
                            name="name"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Instructor id </label>
                        <input
                            value={editItem.instructor_id}
                            onChange={onChange}
                            name="instructor_id"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Type </label>
                        <input
                            value={editItem.type}
                            onChange={onChange}
                            name="type"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Intensity </label>
                        <input
                            value={editItem.intensity}
                            onChange={onChange}
                            name="intensity"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Loaction </label>
                        <input
                            value={editItem.location}
                            onChange={onChange}
                            name="location"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Max Size </label>
                        <input
                            value={editItem.max_capacity}
                            onChange={onChange}
                            name="max_capacity"
                            type="number"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Date </label>
                        <input
                            value={editItem.date}
                            onChange={onChange}
                            name="date"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Time </label>
                        <input
                            value={editItem.start_time}
                            onChange={onChange}
                            name="start_time"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration </label>
                        <input
                            value={editItem.duration}
                            onChange={onChange}
                            name="duration"
                            type="number"
                            className="form-control"
                        />
                    </div>
                </div>
                {showModal && <DeleteClassModal handleYesFunc={handleYesFunc} handleNoFunc={handleNoFunc} />}
                <div className="edit-btns">
                    <div className="form-submit">
                        <input type="submit" className="submit-btn" value="Save" />
                    </div>
                    <div className="delete-class">
                        <span onClick={handleDelete} className="delete-btn">Delete</span>
                    </div>
                </div>

            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        bookedClasses: state.reserveReducer.bookedClasses,
    }
}

export default connect(mapStateToProps, { editClass, deleteClass, cancelClass })(EditForm);
