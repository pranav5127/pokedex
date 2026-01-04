import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image"

interface Pokemon {
    name: string
    image: string
}

export default function Index() {

    const [pokemons, setPokemon] = useState<Pokemon[]>([])
    const URL = "https://pokeapi.co/api/v2/pokemon/?limit=20"
    useEffect(() => {
        // fetch pokemon
        fetchPokemons()
    }, [])

    async function fetchPokemons() {
        try {
            const response = await fetch(URL)
            const data = await response.json()

            // fetch detailed pokemon report
            const detailedPokemon = await Promise.all(
                data.results.map(async (pokemon: any) => {
                    const res = await fetch(pokemon.url)
                    const details = await res.json()

                    return {
                        name: pokemon.name,
                        image: details.sprites.front_default
                    }
                })
            )
            setPokemon(detailedPokemon)

        } catch (error) {
            console.log(error);

        }
    }


    return (

        <ScrollView>
            {
                pokemons.map((pokemon) => (
                    <View key={pokemon.name}>
                        <Text>{pokemon.name}</Text>
                        {/* <Text>{pokemon.image}</Text> */}
                        <Image source={{uri: pokemon.image}} style={{
                            width: 200,
                            height: 200
                        }}/>
                    </View>
                ))
            }
        </ScrollView>
    )
}
