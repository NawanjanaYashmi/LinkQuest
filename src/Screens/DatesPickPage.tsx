import React, { useState } from "react";
import { View, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

const DateRangePicker = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  interface MarkedDates {
    [date: string]: {
      startingDay?: boolean;
      endingDay?: boolean;
      color: string;
      textColor: string;
    };
  }

  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [startDate, setStartDate] = useState("");
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);

  const onDayPress = async (day: any) => {
    if (!isStartDatePicked) {
      let markedDates: MarkedDates = {};
      markedDates[day.dateString] = { startingDay: true, color: "#00B0BF", textColor: "#FFFFFF" };
      setMarkedDates(markedDates);
      setStartDate(day.dateString);
      setIsStartDatePicked(true);

      // Save the selected month to AsyncStorage
      const selectedMonth = moment(day.dateString).format("MMMM");
      await AsyncStorage.setItem("selected_month", selectedMonth);
    } else {
      let updatedMarkedDates: MarkedDates = { ...markedDates };
      let start = moment(startDate);
      let end = moment(day.dateString);
      let range = end.diff(start, "days");

      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = start.add(1, "day").format("YYYY-MM-DD");
          if (i < range) {
            updatedMarkedDates[tempDate] = { color: "#222", textColor: "#FFFFFF" };
          } else {
            updatedMarkedDates[tempDate] = { endingDay: true, color: "#00B0BF", textColor: "#FFFFFF" };
          }
        }
        setMarkedDates(updatedMarkedDates);
        setIsStartDatePicked(false);
        setStartDate("");

        // Save the number of days to AsyncStorage
        await AsyncStorage.setItem("number_of_days", range.toString());
      } else {
        Alert.alert("Select an upcoming date!");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.selctImge}>
          <Image
            source={require('../Images/selectionPageImg.png')}
            style={styles.selectionPageImg}
          />
        </View>
        <Text style={styles.headerTextSlectionPage}>
          Pick the Dates that you plan to visit Sri Lanka?
        </Text>
        <Calendar
          minDate={new Date().toISOString().split("T")[0]}
          monthFormat={"MMMM yyyy"}
          markedDates={markedDates}
          markingType={"period"}
          onDayPress={onDayPress}
        />
        <View style={styles.navigationContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('RoutePlanning')}>
            <Image source={require('../Images/selectionImg2.png')} style={styles.selectionPageImg1} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerTextSlectionPage: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 30,
    color: '#2A2A2A',
  },
  selectionPageImg: {
    width: 280,
    height: 280,
  },
  selctImge: {
    alignItems: 'center',
    marginTop: 10,
  },
  navigationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end', // Aligns the button to the right
    marginBottom: 20,
  },
  selectionPageImg1: {
    width: 50,
    height: 50,
  },
});

export default DateRangePicker;