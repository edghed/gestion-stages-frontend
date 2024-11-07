import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import StudentItem from './StudentItem';

const ListStudentsPage = () => {
    const axiosInstance = useAxios(); 
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axiosInstance.get('/students');
                setStudents(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Erreur lors de la récupération des étudiants :", error);
                setError("Impossible de charger les étudiants.");
            }
        };
        fetchStudents();
    }, []);

    const handleDelete = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Liste des étudiants</h1>
            {students.length > 0 ? (
                <ul className="list-group">
                    {students.map(student => (
                        <StudentItem key={student.id} student={student} onDelete={handleDelete} />
                    ))}
                </ul>
            ) : (
                <p>Aucun étudiant trouvé.</p>
            )}
        </div>
    );
};

export default ListStudentsPage;
