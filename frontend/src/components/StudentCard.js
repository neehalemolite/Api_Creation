
import React from 'react';
import axios from 'axios';

const StudentCard = ({ student, onEdit, fetchStudents }) => {
    const handleDelete = async () => {
        alert("are you sure to delete this entry?")
        await axios.delete(`http://localhost:4000/student/${student._id}`);
        fetchStudents();
    };

    return (
        <div className="student-card">
            <div>
                <strong>{student.name} {student.surname}</strong>
                <p>{student.email}</p>
                <p>{student.gender}</p>
                <p>{student.hobbies.join(', ')}</p>
                <p>{student.country}</p>
                <p>{student.state}</p>
                <p>{student.city}</p>
                <p>{student.address}</p>
            </div>
            <div>
                <button onClick={() => onEdit(student)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default StudentCard;
