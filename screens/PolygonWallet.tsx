import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { observer } from "mobx-react-lite";
import BottomTab from "../components/BottomTab";
import { getPolygonWalletInfo } from "../helpers/Wallet";
import btcStore from "../stores/btcStore";
import Loader from "../components/Loader";
import { useNavigation } from "@react-navigation/native";

const PolygonWalletScreen: React.FC = () => {
  const [connected, setConnected] = useState(false); // Whether a wallet is connected or not
  const [loader, setLoader] = useState<boolean>(false); // The loader state
  const [address, setAddress] = useState(""); // The Polygon wallet address

  const navigation = useNavigation();

  const divider = 10 ** 19; // 1 MATIC = 1000000000000000000000000000000 Wei

  const connectWallet = () => {
	if(address.length === 0){
		Alert.alert("Error", "Address cannot be empty");
		return;
	};
	setLoader(true);
	getPolygonWalletInfo(address)
	.then((walletInfo) => {
		setLoader(false);
		console.log(walletInfo);
		btcStore.getMaticAddress(address);
		btcStore.getMaticBalance((walletInfo.result/divider).toString());
		btcStore.setMaticConnected(true);
		setConnected(true);
	})
	.catch((error) => {
		setLoader(false);
		Alert.alert("Error", "Invalid Address");
		console.log(error);
	});
  };

  React.useEffect(() => {
	setConnected(btcStore.maticConnected);
  }, [btcStore.maticConnected]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Polygon Wallet</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('SendMATIC')}>
          <Text style={styles.headerButtonText}>Send USDC</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {connected ? (
          <>
            <Text style={styles.addressLabel}>Connected to:</Text>
            <Text style={styles.addressValue}>{btcStore.maticAddress}</Text>
            <Text style={styles.balanceLabel}>Available MATIC</Text>
            <Text style={styles.balanceValue}>{btcStore.maticBalance} MATIC</Text>
          </>
        ) : (
          <>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter Polygon Address"
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
	  {loader && <Loader />}
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
    color: "#2f74c3",
  },
  connectButton: {
    backgroundColor: "#2f74c3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  connectButtonText: {
    color: "#fff",
    fontSize: 16,
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

export default observer(PolygonWalletScreen);
