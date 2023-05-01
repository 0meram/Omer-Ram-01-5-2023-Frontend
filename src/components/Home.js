import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import "../App.css";

function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [foundCities, setFoundCities] = useState([]);
    const [selectedCityKey, setSelectedCityKey] = useState(null);

    useEffect(() => {
        if (searchTerm) {
            axios
                .get(`/search/${searchTerm}`)
                .then((response) => {
                    setFoundCities(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCityClick = (cityKey) => {
        setSelectedCityKey(cityKey);
    };

    return (
        <div className="Home">
            <div className="Search">
                <input className="search-input" type="text" value={searchTerm} onChange={handleSearch} placeholder="Search for a city" />
                <div className="CurrentWeather">current wether
                    {selectedCityKey && <CurrentWeather cityKey={selectedCityKey} />}
                </div>
            </div>
            <div className="FoundCities">
                foundCities
                {foundCities.map((city) => (
                    <div key={city.Key} onClick={() => handleCityClick(city.Key)}>
                        {city.LocalizedName}, {city.AdministrativeArea.LocalizedName}, {city.Country.LocalizedName}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;