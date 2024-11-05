import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const ListStudentsPage = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get('/students')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setStudents(response.data);
                } else {
                    setStudents([]);
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des étudiants :", error);
                setError("Impossible de charger les étudiants.");
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {students.length > 0 ? (
                students.map(student => (
                    <div key={student.id}>{student.name}</div>
                ))
            ) : (
                <p>Aucun étudiant trouvé.</p>
            )}
        </div>
    );
};

export default ListStudentsPage;
