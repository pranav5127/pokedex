import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function DetailsScreen() {

    const params = useLocalSearchParams()
    console.log(params);
    
    return (
        <View>
            <Text>
                Hello
            </Text>
        </View>
    )
}