import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [playerTag, setPlayerTag] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlayerData = async () => {
    if (!playerTag || (!playerTag.startsWith('#') && !playerTag.startsWith('23'))) {
      console.error('Invalid player tag. Please enter a valid tag starting with # or 23.');
      return;
    }

    setLoading(true);
    const normalizedTag = playerTag.replace('23', '#');

    try {
      const response = await axios.post('http://127.0.0.1:8000/player', {
        tag: normalizedTag,
      });
      setPlayerData(response.data);
    } catch (error) {
      console.error('Error fetching player data:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      } else if (error.request) {
        console.error('No Response Received:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Brawl Stars Player Lookup</h1>
      <input
        type="text"
        placeholder="Enter Player Tag (e.g., #123ABC or 23123ABC)"
        value={playerTag}
        onChange={(e) => setPlayerTag(e.target.value)}
        style={{ padding: '10px', width: '300px' }}
      />
      <button
        onClick={fetchPlayerData}
        disabled={loading}
        style={{ marginLeft: '10px', padding: '10px 20px' }}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {playerData && (
        <div style={{ marginTop: '20px' }}>
          <h2>Player Data</h2>
          <pre>{JSON.stringify(playerData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}