import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import BottomTab from "../components/BottomTab";

// Define the static data for the table rows
const tableRows = [
  {
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    title: "Bitcoin",
    fluctuations: "+3.52%",
    value: "$42,523.62",
  },
  {
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    title: "Ethereum",
    fluctuations: "-1.78%",
    value: "$2,940.01",
  },
  {
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    title: "Dogecoin",
    fluctuations: "+7.21%",
    value: "$0.4289",
  },
];

const Dashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Transaction History</Text>
        </TouchableOpacity>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <ScrollView>
          {tableRows.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <Image source={{ uri: row.image }} style={styles.tableRowImage} />
              <View style={styles.tableRowTextContainer}>
                <Text style={styles.tableRowTitle}>{row.title}</Text>
                <Text style={styles.tableRowFluctuations}>
                  {row.fluctuations}
                </Text>
              </View>
              <Text style={styles.tableRowValue}>{row.value}</Text>
            </View>
          ))}
        </ScrollView>
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
  table: {
    flex: 6,
    marginHorizontal: 20,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableRowImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  tableRowTextContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  tableRowTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tableRowFluctuations: {
    fontSize: 14,
    color: "#2f74c3",
  },
  tableRowValue: {
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

export default Dashboard;
