import { useEffect, useState } from "react"
import { FlatList, Text, View, StyleSheet } from "react-native"
import { Image } from "expo-image"
import { Link } from "expo-router"
import { colorByType } from "@/constants/colors"
import { fetchPokemons, PokemonListItem } from "@/services/pokemonDetails"

export default function Index() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPokemons()
  }, [])

  async function loadPokemons() {
    try {
      const data = await fetchPokemons(1000)
      setPokemons(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Text style={{ textAlign: "center", marginTop: 40 }}>Loading...</Text>
  }

return (
  <FlatList
    data={pokemons}
    keyExtractor={(item) => item.name}
    contentContainerStyle={{ gap: 16, padding: 8 }}
    renderItem={({ item }) => (
      <Link href={{ pathname: "/details", params: { name: item.name, mainType: item.types[0].name } }}>
        <View
          style={{
            width: "100%",
            backgroundColor: colorByType[item.types[0].name] + "30",
            padding: 12,
            borderRadius: 20,
          }}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.types[0].name}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 12,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 150, height: 150 }}
            />
            <Image
              source={{ uri: item.imageAlt }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </View>
      </Link>
    )}
  />
  )}


const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    textAlign: "center",
  },
})
