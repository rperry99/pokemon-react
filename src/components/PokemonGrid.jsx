import React, {use, useState} from 'react'
import styles from './pokemonGrid.module.css'

async function fetchData(url) {
    const res = await fetch(url)
    return res.json()
}

export default function PokemonGrid( props ) {
    const {handleSelectedPokemon, url} = props
    const [search, setSearch] = useState('')
    let data

    if (localStorage.getItem('pokemon-cards')) {
        data = JSON.parse(localStorage.getItem('pokemon-cards'))
        console.log('FETCHED FROM CACHE', console.log(data))
    } else {
        data = use(fetchData(url))
        localStorage.setItem('pokemon-cards', JSON.stringify(data))
        console.log('FETCHED FROM API')
    }

    

    return (
        <div className={styles.pokemonGrid}>
            <h1 className={styles.header}>Choose a Pokemon</h1>
            <div className={styles.listContainer}>
                <input placeholder="Search for a Pokemon" value={search} onChange={(e) => setSearch(e.target.value)} />
                {data.results.filter(val => {
                    return val.name.includes(search)
                }).map((pokemon, pokemonIndex) => {
                    return (
                        <div onClick={handleSelectedPokemon(pokemon.name)} key={pokemonIndex} className={styles.pokemon}>
                            {pokemon.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}