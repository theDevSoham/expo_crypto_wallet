import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BottomTab from "../components/BottomTab";
import { useNavigation } from "@react-navigation/native";

const BitcoinWalletScreen: React.FC = () => {
  const [connected, setConnected] = useState(false); // Whether a wallet is connected or not
  const [balance, setBalance] = useState(0); // The available bitcoins in the wallet
  const [address, setAddress] = useState(""); // The bitcoin wallet address

  const navigation = useNavigation();

  const connectWallet = () => {
    // Implement your wallet connection logic here
    setConnected(true);
    setBalance(0.12345); // Example balance value
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Bitcoin Wallet</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('SendBTC')}>
          <Text style={styles.headerButtonText}>Send BTC</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {connected ? (
          <>
            <Text style={styles.addressLabel}>Connected to:</Text>
            <Text style={styles.addressValue}>{address}</Text>
            <Text style={styles.balanceLabel}>Available Bitcoins</Text>
            <Text style={styles.balanceValue}>{balance} BTC</Text>
          </>
        ) : (
          <>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter Bitcoin Address"
              onChangeText={(text) => setAddress(text)}
              value={address}
            />
            <TouchableOpacity
              style={styles.connectButton}
              onPress={connectWallet}
            >
              <Text style={styles.connectButtonText}>Connect to Wallet</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <BottomTab />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerButton: {
    backgroundColor: "#2f74c3",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  addressInput: {
    height: 50,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addressLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addressValue: {
    fontSize: 14,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: "bold",
  },
  connectButton: {
    backgroundColor: "#2f74c3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default BitcoinWalletScreen;
