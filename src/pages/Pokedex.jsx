import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListPokemons from '../components/ListPokemons'
import { paginationLogic } from "../helpers/paginationLogic";
import { setNameTrainerGlobal } from "../store/slices/nameTrainer.slice";
import "./styles/Pokedex.css"

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])
    const [types, setTypes] = useState([])
    const [namePokemon, setNamePokemon] = useState("")
    const [pokemonsFilter, setPokemonsFilter] = useState([])
    const [pokemonType, setPokemonType] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const nameTrainer = useSelector((state) => state.nameTrainer)


    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.namePokemon.value
        setNamePokemon(name)
    }

    const handleChangeSelect = (e) => {
        setPokemonType(e.target.value)

    }

    const { lastPage, pagesInBlock, pokemonsInPage } = paginationLogic(currentPage, pokemonsFilter)

    const handleClickPage = (newPage) => {
        setCurrentPage(newPage)
    }

    const handleNextPage = () => {
        const newPage = currentPage + 1
        if (newPage > lastPage) {
            setCurrentPage(1)
        } else {
            setCurrentPage(newPage)
        }
    }

    const hanldePreviousPage = () => {
        const newPage = currentPage - 1
        if (newPage < 1) {
            setCurrentPage(lastPage)
        } else {
            setCurrentPage(newPage)
        }
    }


    const handleFirstPage = () => {
        setCurrentPage(1)
    }

    const handleLastPage = () => {
        setCurrentPage(lastPage)
    }


    const dispatch = useDispatch()

    const handleClickLogOut = () => {
        dispatch(setNameTrainerGlobal(""))
    }

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/${pokemonType ? `type/${pokemonType}/` : "pokemon/?limit=200"}
      `
        axios
            .get(URL)
            .then((res) => {
                if (pokemonType) {
                    const newPokemons = res.data.pokemon.map(pokemon => pokemon.pokemon)
                    setPokemons(newPokemons)
                } else {
                    setPokemons(res.data.results)
                }
            })
            .catch((err) => console.log(err))
    }, [pokemonType])

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/type/`
        axios.get(URL)
            .then(res => setTypes(res.data.results))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (!pokemons) return
        const newPokemons = pokemons.filter(pokemon => pokemon.name.includes(namePokemon))
        setPokemonsFilter(newPokemons)
    }, [namePokemon, pokemons])


    return (
        <main>
            <header className="pokedex__header">
                <i onClick={handleClickLogOut} className='header__logout bx bx-log-out-circle' ></i>
                <p>
                    Welcome <span>{nameTrainer}</span>, here you can find youree favorite
                    Pokemon
                </p>
                <form onSubmit={handleSubmit} className="pokedex-form" >
                    <div className="pokedex-search">
                        <input className="pokedex__inpt" type="text" id="namePokemon" />
                        <button className="pokedex__btn" type="submit">Search</button>
                    </div>
                    <select onChange={handleChangeSelect} className="pokedex-select">
                        <option value="">All pokemons</option>
                        {
                            types.map(type => <option value={type.name} key={type.url}>{type.name}</option>)
                        }
                    </select>
                </form>
            </header>
            <ListPokemons pokemons={pokemonsInPage} />
            <ul className="pokedex__listPages">
                <li onClick={hanldePreviousPage}>{"<"}</li>
                <li onClick={handleFirstPage}>...</li>
                {
                    pagesInBlock.map(pageInBlock => <li className={currentPage === pageInBlock ? "actualPage" : ""} onClick={() => handleClickPage(pageInBlock)} key={pageInBlock}>{pageInBlock}</li>)
                }
                <li onClick={handleLastPage}>...</li>
                <li onClick={handleNextPage}>{">"}</li>
            </ul>
        </main>
    )
}

export default Pokedex