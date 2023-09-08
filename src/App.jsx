import { useState, Suspense, use } from 'react'
import ErrorBoundary from './ErrorBoundary'
import PokemonCard from './components/PokemonCard'
import PokemonGrid from './components/PokemonGrid'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const url = 'https://pokeapi.co/api/v2/pokemon'

  function handleSelectedPokemon(pokemon) {
        return () => {
          setSelectedPokemon(pokemon)
        }
  }

  return (
    <ErrorBoundary fallback={<div>Error...</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          {selectedPokemon ? (
            <PokemonCard parentUrl={url} selectedPokemon={selectedPokemon} clearHandler = {() => {
              setSelectedPokemon(null)
            }}/>
          ) : (
            <PokemonGrid url={url} handleSelectedPokemon={handleSelectedPokemon}/>
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
