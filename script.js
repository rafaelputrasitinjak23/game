import { fetchAnimeList } from '@bochilteam/scraper';

document.addEventListener('DOMContentLoaded', async () => {
    const animeImage = document.getElementById('anime-image');
    const guessInput = document.getElementById('guess-input');
    const submitGuess = document.getElementById('submit-guess');
    const resultMessage = document.getElementById('result-message');

    let correctAnime = '';

    // Fetch random anime from a list
    async function fetchRandomAnime() {
        try {
            const animeList = await fetchAnimeList();
            const randomIndex = Math.floor(Math.random() * animeList.length);
            const selectedAnime = animeList[randomIndex];

            animeImage.src = selectedAnime.image; // Display the selected anime's image
            correctAnime = selectedAnime.title.toLowerCase(); // Store the correct anime title for checking
        } catch (error) {
            console.error('Failed to fetch anime', error);
        }
    }

    // Check the user's guess
    submitGuess.addEventListener('click', () => {
        const userGuess = guessInput.value.trim().toLowerCase();
        if (userGuess === correctAnime) {
            resultMessage.textContent = 'Correct! You guessed the anime!';
            resultMessage.style.color = 'green';
        } else {
            resultMessage.textContent = 'Wrong! Try again.';
            resultMessage.style.color = 'red';
        }
    });

    // Load the first anime when the page loads
    await fetchRandomAnime();
});

// Function to fetch anime list
async function fetchAnimeList() {
    try {
        const response = await fetch('https://api.example.com/anime-list'); // Ganti dengan endpoint yang sesuai
        const animeList = await response.json();
        return animeList;
    } catch (error) {
        console.error('Error fetching the anime list:', error);
        return [];
    }
}