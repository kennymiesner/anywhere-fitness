import React from 'react';
import { connect } from 'react-redux';
import { getClasses, fetchFail } from '../../actions/classActions';
import Class from './Class';

const Classes = (props) => {

    if (props.error) {
        return <div className="classes-wrapper">
            <h2>We got an error: {props.error}</h2>
        </div>
    }

    if (props.isFetching) {
        return <div className="classes-wrapper">
            <h2>Fetching Classes. Please wait.</h2>
        </div>
    }

    return (
        <div className="classes-wrapper">
            <Class />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        classes: state.classesReducer.classes,
        isFetching: state.classesReducer.isFetching,
        error: state.classesReducer.error,
    }
}

export default connect(mapStateToProps, { getClasses, fetchFail })(Classes);