import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentCard from './components/StudentCard';
import './App.css';

const App = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchStudents = async () => {

        const response = await axios.get('http://localhost:4000/student');
        setStudents(response.data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleEdit = (student) => {
        setSelectedStudent(student);
    };

    return (
        <div className="app">
            <h1>Student Management</h1>
            <div className="form-container">
                <StudentForm
                    selectedStudent={selectedStudent}
                    fetchStudents={fetchStudents}
                />
            </div>
            <div className="list-container">
                <h2>Student List</h2>
                <div className="student-list">
                    {students.map((student) => (
                        <StudentCard
                            key={student._id}
                            student={student}
                            onEdit={handleEdit}
                            fetchStudents={fetchStudents}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
