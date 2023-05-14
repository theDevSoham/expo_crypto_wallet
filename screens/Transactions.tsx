import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

const BTC_TRANSACTIONS = [
  {
    id: "1",
    type: "Received",
    date: "May 10, 2023",
    amount: "0.12345 BTC",
    status: "Completed",
  },
  {
    id: "2",
    type: "Sent",
    date: "May 8, 2023",
    amount: "0.042 BTC",
    status: "Completed",
  },
  {
    id: "3",
    type: "Received",
    date: "May 6, 2023",
    amount: "0.98765 BTC",
    status: "Completed",
  },
];

const USDC_TRANSACTIONS = [
  {
    id: "1",
    type: "Received",
    date: "May 9, 2023",
    amount: "$100.00 USDC",
    status: "Completed",
  },
  {
    id: "2",
    type: "Sent",
    date: "May 7, 2023",
    amount: "$50.00 USDC",
    status: "Completed",
  },
  {
    id: "3",
    type: "Received",
    date: "May 5, 2023",
    amount: "$200.00 USDC",
    status: "Completed",
  },
];

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = useState("BTC");
  const navigation = useNavigation();

  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
  };

  const renderTransactionItem = ({ item }: any) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionType}>{item.type}</Text>
      <View style={styles.transactionBody}>
		<Text style={styles.transactionDate}>{item.date}</Text>
		<Text style={styles.transactionAmount}>{item.amount}</Text>
	  </View>
      <Text style={styles.transactionStatus}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaction History</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.headerButtonText}>Home</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "BTC" ? styles.activeTabButton : null,
          ]}
          onPress={() => handleTabPress("BTC")}
        >
          <Text style={styles.tabButtonText}>Bitcoin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "USDC" ? styles.activeTabButton : null,
          ]}
          onPress={() => handleTabPress("USDC")}
        >
          <Text style={styles.tabButtonText}>USDC</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      {activeTab === "BTC" ? (
        <FlatList
          data={BTC_TRANSACTIONS}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={USDC_TRANSACTIONS}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerButton: {
    backgroundColor: "#0066CC",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 10,
  },
  activeTabButton: {
    backgroundColor: "#0066CC",
  },
  tabButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  transactionItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    paddingVertical: 10,
    marginBottom: 10,
  },
  transactionType: {
    fontWeight: "bold",
    fontSize: 16,
  },
  transactionBody: {
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
  },
  transactionDate: {
    color: "#666",
	marginRight: 10,
  },
  transactionAmount: {
    fontWeight: "bold",
    fontSize: 16,
	marginLeft: 10,
  },
  transactionStatus: {
    color: "#666",
  },
});

export default Transactions;
