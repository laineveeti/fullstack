import { useEffect, useState } from 'react';
import axios from 'axios';

const Countries = ({countries, handleClick}) => (
    <div>
        {countries.map(country => (
            <>
                <p key={country.name.common}>{country.name.common}</p>
                <p>
                    <button key={country.name.common} onClick={handleClick(country.name.common)}>show</button>
                 </p>
            </>
        ))}
    </div>
)

const Country = ({country}) => (
    <div>
        <h1>{country.name.common}</h1>
        capital {country.capital[0]}
        <br></br>
        area {country.area}
        <h3>languages</h3>
        <ul>
            {Object.entries(country.languages).map(([langKey, langVal]) => <li key={langKey}>{langVal}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.name.common}></img>
        <Weather city={country.capital} />
    </div>
)

const Weather = ({city}) => {
    const [currentWeather, setCurrentWeather] = useState({});
    
    useEffect(() => {
        axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
            .then(response => {
                return response.data.results[0];
            })
            .then(results => {
                const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${results.latitude}&longitude=${results.longitude}&current_weather=true&windspeed_unit=ms&timezone=Europe%2FLondon`
                axios.get(apiUrl)
                    .then(response => {
                        setCurrentWeather(response.data.current_weather);
                    })
                })
    }, []);

    return (
        <div>
            <h3>Weather in {city}</h3>
            <br></br>
            temperature {currentWeather.temperature} Celsius
            <br></br>
            wind {currentWeather.windspeed} m/s
        </div>
    );
}

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log(response);
                setCountries(response.data);
            })
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const handleClick = (name) => {
        return () => {
            setFilter(name);
        }
    }

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            <input value={filter} onChange={handleFilterChange} />
            {filteredCountries.length === 1
                ? <Country country={filteredCountries[0]} />
                : filteredCountries.length > 10
                    ? <p>Too many matches, specify another filter</p>
                    : <Countries countries={filteredCountries} handleClick={handleClick} />
            }
        </div>
    )
}

export default App;