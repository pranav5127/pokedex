import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#000",
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen 
     
        name="index"
        options={{
          headerTitle :"Pokedex",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ 
            headerTransparent: true,
            headerTitle: "",
        }} 
      />
    </Stack>
  );
}