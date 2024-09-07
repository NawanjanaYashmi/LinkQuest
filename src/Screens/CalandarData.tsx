// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList, ListRenderItem } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import axios from 'axios';

// // Define the type for a Google Calendar event
// interface CalendarEvent {
//   id: string;
//   summary: string;
//   start: {
//     dateTime?: string;
//     date?: string;
//   };
// }

// const CalendarDate: React.FC = () => {
//   const [events, setEvents] = useState<CalendarEvent[]>([]); // Use the CalendarEvent type
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     // Configure Google Sign-In
//     GoogleSignin.configure({
//       webClientId: 'YOUR_FIREBASE_WEB_CLIENT_ID', // Replace with your Firebase web client ID
//       offlineAccess: true,
//       scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
//     });
//   }, []);

//   const signInWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       const { idToken, accessToken } = await GoogleSignin.getTokens();

//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//       await auth().signInWithCredential(googleCredential);

//       fetchGoogleCalendarEvents(accessToken); // Fetch calendar events after signing in
//     } catch (error) {
//       handleSignInError(error);
//     }
//   };

//   const handleSignInError = (error: any) => {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       console.log('User cancelled the login process');
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       console.log('Sign in is in progress already');
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       console.log('Play services are not available');
//     } else {
//       console.error('Sign in error:', error);
//     }
//   };

//   const fetchGoogleCalendarEvents = async (token: string) => {
//     setLoading(true);
//     try {
//       const response = await axios.get<{ items: CalendarEvent[] }>('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setEvents(response.data.items || []);
//     } catch (error) {
//       console.error('Failed to fetch events:', error);
//     }
//     setLoading(false);
//   };

//   const renderItem: ListRenderItem<CalendarEvent> = ({ item }) => (
//     <View style={{ marginVertical: 10 }}>
//       <Text style={{ fontWeight: 'bold' }}>{item.summary}</Text>
//       <Text>{item.start?.dateTime || item.start?.date}</Text>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Button title="Sign in with Google" onPress={signInWithGoogle} />

//       {loading ? (
//         <Text>Loading events...</Text>
//       ) : (
//         <FlatList
//           data={events}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//         />
//       )}
//     </View>
//   );
// };

// export default CalendarDate;