import './shim';
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./screens/Dashboard";
import BitcoinWallet from "./screens/BitcoinWallet";
import PolygonWallet from "./screens/PolygonWallet";
import SendBtc from "./screens/SendBtc";
import { Provider } from "mobx-react";
import btcStore from "./stores/btcStore";
import SendMatic from "./screens/SendMatic";
import Transactions from "./screens/Transactions";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
      <Provider store={btcStore}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BitcoinWallet"
              component={BitcoinWallet}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PolygonWallet"
              component={PolygonWallet}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SendBTC"
              component={SendBtc}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SendMATIC"
              component={SendMatic}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Transactions"
              component={Transactions}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
