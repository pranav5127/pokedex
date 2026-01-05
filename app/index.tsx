import { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image"

interface Pokemon {
    name: string
    image: string
    imageAlt: string
    types: PokemonType[]
}

interface PokemonType {
    type: {
        name: string
        url: string
    }
}

const colorByType: Record<string, string> = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
}

export default function Index() {

    const [pokemons, setPokemon] = useState<Pokemon[]>([])
    const URL = "https://pokeapi.co/api/v2/pokemon/?limit=100"
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
                        image: details.sprites.front_default,
                        imageAlt: details.sprites.back_default,
                        types: details.types
                    }
                })
            )
            setPokemon(detailedPokemon)

        } catch (error) {
            console.log(error);

        }
    }


    return (

        <ScrollView
        contentContainerStyle={{
            gap: 16,
            padding: 8,
        }}>
            {
                pokemons.map((pokemon) => (
                    <View 
                    key={pokemon.name}
                    style={{
                        backgroundColor: colorByType[pokemon.types[0].type.name] + 30,
                        padding: 8, 
                        borderRadius: 20   
                    }}
                    >
                        <Text style={styles.name}>{pokemon.name}</Text>
                        <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Image source={{ uri: pokemon.image }} style={{
                                width: 200,
                                height: 200
                            }} />
                            <Image source={{ uri: pokemon.imageAlt }} style={{
                                width: 200,
                                height: 200
                            }} />
                        </View>
                    </View>
                ))
            }
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    name: {
        fontSize: 28,
        fontWeight: "bold" ,
        textAlign: 'center'
    },
    type: {
        fontSize: 20,
        fontWeight: "bold",
        color: "grey",
        textAlign:'center'
    }
})