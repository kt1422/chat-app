import React from 'react'

const Startbox = ({ logUser }) => {
    return (
        <div className='d-flex flex-fill bg-primary rounded justify-content-center align-items-center flex-column text-white'>
            <h1>Hello {logUser.username}</h1>
            <h3>Please select a contact to start chatting 😀</h3>
        </div>
    )
}

export default Startbox