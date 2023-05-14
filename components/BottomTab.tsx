import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const BottomTab: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const changeRoute = (routeName: string): void => {
	if(route.name === routeName){
		return;
	} else {
		navigation.navigate(routeName);
	}
  };

  return (
    <>
      <TouchableOpacity style={styles.tab} onPress={() => changeRoute('BitcoinWallet')}>
        <Text style={styles.tabIcon}>⚡️</Text>
        <Text style={styles.tabLabel}>Bitcoin</Text>
        <View style={[styles.activeCont, {
			backgroundColor: route.name === "BitcoinWallet" ? "#2f74c3" : "transparent",
		}]} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => changeRoute('Dashboard')}>
        <Text style={styles.tabIcon}>🎁</Text>
        <Text style={styles.tabLabel}>Home</Text>
        <View style={[styles.activeCont, {
			backgroundColor: route.name === "Dashboard" ? "#2f74c3" : "transparent",
		}]} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => changeRoute('PolygonWallet')}>
        <Text style={styles.tabIcon}>💸</Text>
        <Text style={styles.tabLabel}>Polygon(USDC)</Text>
        <View style={[styles.activeCont, {
			backgroundColor: route.name === "PolygonWallet" ? "#2f74c3" : "transparent",
		}]} />
      </TouchableOpacity>
    </>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tab: {
    alignItems: "center",
  },
  tabIcon: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  activeCont: {
    height: 5,
    width: "100%",
  },
});
