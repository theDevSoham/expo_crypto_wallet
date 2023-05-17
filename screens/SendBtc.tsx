import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { sendBitcoin } from "../helpers/BTCSend";
import { observer } from "mobx-react";
import btcStore from "../stores/btcStore";
import Loader from '../components/BottomTab';

const SendBitcoinTransaction = () => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const handleSendTransaction = async () => {
    if(toAddress.length === 0 || amount.length === 0) return alert("Please fill in all fields");
    try {
      // Success message
      setLoader(true);
      sendBitcoin(btcStore.btcAddress, toAddress, btcStore.btcPrivateKey, Number(amount)).then((res) => {
        setLoader(false);
        alert("Send transaction: " + res);
      }).catch((err) => {
        setLoader(false);
        alert("Error sending transaction: " + err);
      });
      // Reset input fields
      setToAddress("");
      setAmount("");
    } catch (error: any) {
      setLoader(false);
      // Error message
      alert(`Error sending transaction: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>To Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter address to send to"
          value={toAddress}
          onChangeText={setToAddress}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount to send"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSendTransaction}>
        <Text style={styles.buttonText}>Send Transaction</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      {loader && <Loader />}
    </View>
  );
}

export default observer(SendBitcoinTransaction);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
