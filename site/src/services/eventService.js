const API_URL = 'http://localhost:8200/api/events';

export const createEvent = async (eventData) => {
    try {
        console.log('Données envoyées à l\'API:', eventData);
        
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Token d\'authentification manquant');
        }

        const response = await fetch(`${API_URL}/newEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(eventData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('Réponse API error:', data);
            throw new Error(data.message || `Erreur ${response.status}: ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Erreur détaillée:', error);
        throw new Error(`Erreur de création: ${error.message}`);
    }
};
