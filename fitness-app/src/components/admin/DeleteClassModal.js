import React from 'react';

const DeleteClassModal = (props) => {
    return (
        <div id="deleteClassModal">
            <div className="modal-dialog">
                <div className="modal-content show">
                    <form>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this class?</p>
                            <p className="text-warning"><small>This action cannot be undone.</small></p>
                        </div>
                        <div className="modal-footer">
                            <input type="submit" onClick={props.handleYesFunc} className="btn btn-danger" value="Delete" />
                            <input type="button" onClick={props.handleNoFunc} className="btn btn-default" data-dismiss="modal" value="Cancel" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeleteClassModal;