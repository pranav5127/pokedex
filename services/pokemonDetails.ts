const BASE_URL = "https://pokeapi.co/api/v2/pokemon"

export type PokemonType = {
  name: string
}

export type PokemonListItem = {
  name: string
  image: string
  imageAlt: string
  types: PokemonType[]
}

export type PokemonDetails = {
  id: number
  name: string
  height: number
  weight: number
  image: string
  stats: {
    base_stat: number
    stat: { name: string }
  }[]
  types: PokemonType[]
}

export async function fetchPokemons(limit = 1000): Promise<PokemonListItem[]> {
  const response = await fetch(`${BASE_URL}?limit=${limit}`)
  const data = await response.json()

  return Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const res = await fetch(pokemon.url)
      const details = await res.json()

      return {
        name: details.name,
        image: details.sprites.other["official-artwork"].front_default,
        imageAlt: details.sprites.back_default,
        types: details.types.map((t: any) => ({
          name: t.type.name,
        })),
      }
    })
  )
}

export async function fetchPokemonDetails(name: string): Promise<PokemonDetails> {
  const response = await fetch(`${BASE_URL}/${name}`)
  const data = await response.json()

  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    image: data.sprites.other["official-artwork"].front_default,
    stats: data.stats,
    types: data.types.map((t: any) => ({
      name: t.type.name,
    })),
  }
}
