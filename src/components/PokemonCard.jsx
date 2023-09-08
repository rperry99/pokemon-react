import React, {use} from 'react'
import styles from './pokemonCard.module.css'

async function fetchData(url) {
    const res = await fetch(url)
    return res.json()
}

export default function PokemonCard(props) {
    const {selectedPokemon, clearHandler, parentUrl} = props
    const pokemonUrl = parentUrl + '/' + selectedPokemon
    const data = use(fetchData(pokemonUrl))

    return (
        <div className={styles.card}>
            <div className={styles.headerBar}>
                <h1>{selectedPokemon}</h1>
                <div onClick={clearHandler} className={styles.closeButton}>x</div>
            </div>
                <img src={data.sprites.front_default} alt={selectedPokemon} />
                <h3>Stats</h3>
                {data.stats.map((stat, statIndex) => {
                    return (
                        <div key={statIndex}>
                            <p><b>{stat.stat.name}</b> {stat.base_stat}</p>
                        </div>
                    )
                })}
                <h3>Types</h3>
                {data.types.map((type, typeIndex) => {
                    return (
                        <div key={typeIndex}>
                            <p><b>{type.type.name}</b></p>
                        </div>
                    )
                })}
        </div>
    )
}