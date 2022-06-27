import React from 'react'

const Toast = ({ bodyMessage }) => {
    return (
        <div class="alert alert-danger alert-dismissible fade show">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Error!</strong> { bodyMessage }.
        </div>
    )
}

export default Toast 