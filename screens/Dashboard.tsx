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
import { getMarketInfo } from "../helpers/Markets";
import Loader from "../components/Loader";
import { useNavigation } from "@react-navigation/native";

interface TableData {
  image: string;
  title: string;
  fluctuations: string;
  value: string;
}

const Dashboard: React.FC = () => {
  const [tableData, setTableData] = React.useState<TableData[]>([]);
  const [loader, setLoader] = React.useState<boolean>(true);
  const navigation = useNavigation();

  const uniqueArray = (arr: any[]) => {
    const uniqueArr = Array.from(
      new Set(arr.map((item) => JSON.stringify(item)))
    ).map((item) => JSON.parse(item));
    return uniqueArr;
  };

  const loadDashboard = (): void => {
    getMarketInfo()
      .then((info) => {
        info.forEach((element: any) => {
          if (element.id === "bitcoin" || element.id === "usd-coin") {
            setTableData((prev) => {
              const newObj = [
                ...prev,
                {
                  image: element.image,
                  title: `${element.id}(${element.symbol})`,
                  fluctuations: element.price_change_percentage_7d_in_currency
                    .toFixed(3)
                    .toString(),
                  value: element.current_price.toString(),
                },
              ];
              return uniqueArray(newObj);
            });
          }
        });
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  React.useEffect(() => {
		loadDashboard();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.headerButtonText}>Transaction History</Text>
        </TouchableOpacity>
      </View>

      {/* Table */}
      <View style={styles.table}>
        {tableData.length > 0 ? (
          <ScrollView>
            {tableData.map((row, index) => (
              <View style={styles.tableRow} key={index}>
                <Image
                  source={{ uri: row.image }}
                  style={styles.tableRowImage}
                />
                <View style={styles.tableRowTextContainer}>
                  <Text style={styles.tableRowTitle}>{row.title}</Text>
                  <Text style={styles.tableRowFluctuations}>
                    {row.fluctuations}%
                  </Text>
                </View>
                <Text style={styles.tableRowValue}>${row.value}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noData}>
			<Text style={styles.noDataTxt}>No data yet</Text>
		  </View>
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
  noData: {
	flex: 1,
  },
  noDataTxt: {
	fontSize: 24,
	fontWeight: 'bold',
	textAlign: 'center',
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
