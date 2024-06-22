// import React, {useState} from 'react';
// import {ScrollView, StyleSheet, Text, View} from 'react-native';
// import CalendarPicker, {
//   DateChangedCallback,
// } from 'react-native-calendar-picker';
// import {Image} from 'react-native';
// import {TouchableOpacity} from 'react-native';

// const DatesPickPage: React.FC = ({navigation}: any) => {
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);

//   const onDateChange: DateChangedCallback = date => {
//     setSelectedStartDate(date);
//   };

//   const startDate = selectedStartDate ? selectedStartDate.toString() : '';

//   return (
//     <ScrollView style={sty.container}>
//       <TouchableOpacity>
//         <Text style={sty.skipbtn}>Skip</Text>
//       </TouchableOpacity>

//       <View style={sty.DatesPikerimge}>
//         <Image
//           source={require('../Images/pickerPageImg.png')}
//           style={sty.DatesPikerPageimge}
//         />
//       </View>

//       <Text style={sty.headerTextPikerPage}>
//         Pick the Dates that you plan to visit Sri Lanka?
//       </Text>

//       <View style={sty.calendarContainer}>
//         <CalendarPicker onDateChange={onDateChange} width={350} height={350} />

//         <View>
//           <Text>SELECTED DATE: {startDate}</Text>
//         </View>
//       </View>

//       <TouchableOpacity onPress={() => {
//             navigation.navigate('BudgetQuestionPage');
//             console.log('Button pressed');}}>
//         <Image
//           source={require('../Images/selectionImg2.png')}
//           style={sty.selectionPageImg1}
//         />
//      </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const sty = StyleSheet.create({
//   skipbtn: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'right',
//     right: 20,
//     marginTop: 20,
//   },
//   DatesPikerimge: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   DatesPikerPageimge: {
//     width: 240,
//     height: 240,
//   },
//   headerTextPikerPage: {
//     fontSize: 19,
//     textAlign: 'center',
//     fontWeight: '700',
//     marginTop: 30,
//     color: '#2A2A2A',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   calendarContainer: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   selectionPageImg1: {
//     width: 50,
//     height: 50,
//     marginTop: 5,
//     left: 320,
//     marginBottom: 20,
//   },
// });

// export default DatesPickPage;