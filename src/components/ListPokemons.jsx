import React from 'react'
import PokemonCard from './PokemonCard'
import "./styles/ListPokemons.css"

const ListPokemons = ({ pokemons }) => {
    return (
        <section className="listPokemons">
            {pokemons.map((pokemon) => (
                <PokemonCard pokemon={pokemon} key={pokemon.url} />
            ))}
        </section>



    )
}

export default ListPokemons