import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";


interface Pokemon {
  name: string
  url: string
}

export default function Index() {

  const [pokemons, setPokemon ] =  useState<Pokemon[]>([])
  const URL = "https://pokeapi.co/api/v2/pokemon/?limit=20"
  useEffect(() => {
    // fetch pokemon
    fetchPokemons()
  }, [])

  async function fetchPokemons() {
      try {
        const response = await fetch(URL) 
        const data = await response.json()
        setPokemon(data.results)
        
      } catch (error) {
        console.log(error);
         
      }
  }


  return (

    <ScrollView>
      {
        pokemons.map((pokemon) => (
          <View key={pokemon.name}>
            <Text>
              {pokemon.name}
            </Text>
          </View>
        ))
      }
    </ScrollView>
  )
}
