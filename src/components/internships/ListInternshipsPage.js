// src/components/internships/ListInternshipPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const ListInternshipPage = () => {
    const { authToken } = useAuth();
    const [internships, setInternships] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await axios.get('http://localhost:8080/stages', {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setInternships(response.data);
            } catch (err) {
                setError("Erreur lors du chargement des stages");
            }
        };
        fetchInternships();
    }, [authToken]);

    return (
        <div>
            <h2>Liste des stages</h2>
            {error ? <p>{error}</p> : (
                <ul>
                    {internships.map(internship => (
                        <li key={internship.id}>{internship.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListInternshipPage;
