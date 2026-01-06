import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native"
import { Image } from "expo-image"
import { colorByType } from "@/constants/colors"
import { fetchPokemonDetails, PokemonDetails } from "@/services/pokemonDetails"

export default function Details() {
  const { name, mainType } = useLocalSearchParams<{
    name: string
    mainType?: string
  }>()

  const [details, setDetails] = useState<PokemonDetails | null>(null)
  const [loading, setLoading] = useState(true)

  const backgroundColor = colorByType[mainType ?? "normal"] || "#A8A878"

  useEffect(() => {
    if (name) loadDetails()
  }, [name])

  async function loadDetails() {
    try {
      const data = await fetchPokemonDetails(name)
      setDetails(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const formatStatName = (statName: string) => {
    switch (statName) {
      case "hp":
        return "HP"
      case "attack":
        return "ATK"
      case "defense":
        return "DEF"
      case "special-attack":
        return "SATK"
      case "special-defense":
        return "SDEF"
      case "speed":
        return "SPD"
      default:
        return statName
    }
  }

  if (loading || !details) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator color="white" size="large" />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{details.name}</Text>
          <Text style={styles.id}>
            #{String(details.id).padStart(3, "0")}
          </Text>
        </View>

        <View style={styles.typeRow}>
          {details.types.map((t) => (
            <View key={t.name} style={styles.typeBadge}>
              <Text style={styles.typeText}>{t.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: details.image }}
          style={styles.image}
          contentFit="contain"
        />
      </View>

      <ScrollView
        style={styles.detailsContainer}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={[styles.sectionTitle, { color: backgroundColor }]}>
          About
        </Text>

        <View style={styles.row}>
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>{details.weight / 10} kg</Text>
            <Text style={styles.infoLabel}>Weight</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>{details.height / 10} m</Text>
            <Text style={styles.infoLabel}>Height</Text>
          </View>
        </View>

        <Text
          style={[
            styles.sectionTitle,
            { color: backgroundColor, marginTop: 20 },
          ]}
        >
          Base Stats
        </Text>

        {details.stats.map((stat) => (
          <View key={stat.stat.name} style={styles.statRow}>
            <Text style={styles.statName}>
              {formatStatName(stat.stat.name)}
            </Text>
            <Text style={styles.statValue}>{stat.base_stat}</Text>

            <View style={styles.statBarBackground}>
              <View
                style={[
                  styles.statBarFill,
                  {
                    width: `${Math.min(stat.base_stat, 100)}%`,
                    backgroundColor,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  name: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  id: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  typeBadge: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 5,
  },
  typeText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  imageContainer: {
    alignItems: "center",
    zIndex: 1,
    marginBottom: -40,
  },
  image: {
    width: 250,
    height: 250,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  infoBox: {
    alignItems: "center",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  infoLabel: {
    color: "gray",
    fontSize: 12,
    marginTop: 4,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statName: {
    width: 40,
    color: "gray",
    fontSize: 12,
    fontWeight: "bold",
  },
  statValue: {
    width: 30,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
    marginRight: 10,
  },
  statBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    borderRadius: 3,
  },
})
