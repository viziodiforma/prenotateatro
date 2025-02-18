document.getElementById('prenotazioneForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prendi i valori dal modulo
    const nome = document.getElementById('nome').value;
    const data_spettacolo = document.getElementById('data_spettacolo').value;

    // Prepara i dati da inviare
    const prenotazioneData = {
        nome: nome,
        data_spettacolo: data_spettacolo
    };

    try {
        // Invia la richiesta POST al backend
        const response = await fetch('http://localhost:3000/prenotazioni', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prenotazioneData)
        });

        if (response.ok) {
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('prenotazioneForm').reset();
        } else {
            throw new Error('Errore nella prenotazione');
        }
    } catch (error) {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
    }
});
