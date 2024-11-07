import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import InternshipItem from './InternshipItem';

const ListInternshipPage = () => {
    const axiosInstance = useAxios(); 
    const [internships, setInternships] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await axiosInstance.get('/stages');
                setInternships(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Erreur lors du chargement des stages :", error);
                setError("Impossible de charger les stages.");
            }
        };
        
        fetchInternships();
    }, []);

   
    const handleDelete = (id) => {
        setInternships(internships.filter(internship => internship.id !== id));
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Liste des stages</h2>
            {internships.length > 0 ? (
                <ul className="list-group">
                    {internships.map(internship => (
                        <InternshipItem key={internship.id} stage={internship} onDelete={handleDelete} />
                    ))}
                </ul>
            ) : (
                <p>Aucun stage trouvé.</p>
            )}
        </div>
    );
};

export default ListInternshipPage;
