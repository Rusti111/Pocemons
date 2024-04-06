import React, { useEffect, useState } from 'react';
import './PocemonList.css';

function PocemonList() {
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPokemons();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fetchPokemons = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${(currentPage - 1) * 10}`);
            const data = await response.json();
            setPokemonData(prevData => [...prevData, ...data.results]);
            setCurrentPage(prevPage => prevPage + 1);
            setIsLoading(false);
        } catch (error) {
            console.error('Произошла ошибка при выполнении запроса:', error);
            setIsLoading(false);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !isLoading) {
            fetchPokemons();
        }
    };

    return (
        <>
            <h1>My Pocemons</h1>
            <div className='container'>
                {pokemonData.map(pokemon => (
                    <div className='block' key={pokemon.name}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
                        <h3>{pokemon.name}</h3>
                    </div>
                ))}
            </div>
            {isLoading && <div>Loading...</div>}
        </>
    );
}

export default PocemonList;
