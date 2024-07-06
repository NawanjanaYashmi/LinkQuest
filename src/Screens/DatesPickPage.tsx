import React, { useState } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { Text } from "react-native-elements";

const DateRangePicker = () => {
  interface MarkedDates {
    [date: string]: {
      startingDay?: boolean;
      endingDay?: boolean;
      color: string;
      textColor: string;
    }
  }
  
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [startDate, setStartDate] = useState("");
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);

  const onDayPress = (day:any) => {
    if (!isStartDatePicked) {
      let markedDates: MarkedDates = {};
      markedDates[day.dateString] = { startingDay: true, color: "#00B0BF", textColor: "#FFFFFF" };
      setMarkedDates(markedDates);
      setStartDate(day.dateString);
      setIsStartDatePicked(true);
    } else {
      let updatedMarkedDates: MarkedDates = {...markedDates };
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
      } else {
        Alert.alert("Select an upcoming date!");
      }
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.selctImge}>
        <Image
          source={require('../Images/selectionPageImg.png')}
          style={styles.selectionPageImg}
        />
        </View>
        <View>
            <Text style={styles.headerTextSlectionPage}>
                Pick the Dates that you plan to visit Sri Lanka?
            </Text>
        </View>
        <View>
        <Calendar
        minDate={new Date().toISOString().split("T")[0]}
        monthFormat={"MMMM yyyy"}
        markedDates={markedDates}
        markingType={"period"}
        onDayPress={onDayPress}
      />
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
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
});

export default DateRangePicker;