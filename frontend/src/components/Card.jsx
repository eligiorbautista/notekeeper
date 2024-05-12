import React from 'react';
import '../styles/card.css'
const Card = ({ note, onDelete, onUpdate }) => {
    /* Filter Date */
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
    return (
        <div className="card-container">
            <p className="card-title">{note.title}</p>
            <p className="card-content">{note.content}</p>
            <p className='card-date'>{formattedDate}</p>
            {/* Pass references to onDelete and onUpdate without invoking them */}

            <div className="buttons-container">
                <button className="update-button" onClick={() => onUpdate(note.id)}>Update</button>
                <button className="delete-button" onClick={() => onDelete(note.id)}>Delete</button></div>
        </div>
    );
};

export default Card;
