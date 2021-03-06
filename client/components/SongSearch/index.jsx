import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import SongOption from '../SongOption';

const SongSearch = props => {
  const [songName, setSongName] = useState('');
  const [songResults, setSongResults] = useState([]);

  // useEffect to pass songs down to SongOption component
  useEffect(() => {}, [songResults]);

  function handleChange(e) {
    setSongName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Functionality to search for song
    const accessToken = Cookies.get('accessToken');
    const data = { token: accessToken, searchQuery: songName };

    fetch('/api/v1/spotify/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        const songOptions = [];
        for (let i = 0; i < response.length; i += 1) {
          const track = response[i].name;
          const artist = response[i].artists[0].name;
          const length = Math.floor(response[i].duration_ms / 1000);
          const thumbnail = response[i].album.images[0].url;
          const uri = response[i].uri;
          songOptions.push(
            <SongOption
              roomId={props.roomId}
              track={track}
              artist={artist}
              length={length}
              thumbnail={thumbnail}
              uri={uri}
              key={`songOption${i}`}
            />
          );
        }
        setSongResults(songOptions);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="searchbar"
          placeholder="Enter Song"
          value={songName}
          onChange={handleChange}
        />
        <input type="submit" value="Search" />
      </form>
      {songResults}
    </div>
  );
};

export default SongSearch;
