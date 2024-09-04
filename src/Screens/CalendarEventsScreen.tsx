// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, ActivityIndicator } from 'react-native';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import CalendarEvents from 'react-native-calendar-events';

// interface SignInResponse {
//   token: string;
//   user: {
//     id: string;
//     email: string;
//     name: string;
//   };
// }

// const CalendarEventsScreen = () => {
//   const [userData, setUserData] = useState<SignInResponse['user'] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const configureGoogleSignIn = async () => {
//       try {
//         await GoogleSignin.configure({
//           webClientId: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your client ID
//           iosClientId: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your client ID
//           forceCodeForRefreshToken: true,
//         });
//       } catch (err) {
//         console.error('Error configuring Google SignIn:', err);
//         setError('Error configuring Google SignIn.');
//       }
//     };

//     const signIn = async () => {
//       try {
//         setLoading(true);
//         const userInfo = await GoogleSignin.signIn();
//         setUserData(userInfo.user);
//         setLoading(false);
//       } catch (err) {
//         if (err.code === statusCodes.SIGN_IN_CANCELLED) {
//           setError('User cancelled the sign-in.');
//         } else if (err.code === statusCodes.IN_PROGRESS) {
//           setError('Sign-in is in progress.');
//         } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//           setError('Play Services not available.');
//         } else {
//           setError('Error signing in. Please try again later.');
//         }
//         setLoading(false);
//       }
//     };

//     const getCalendarEvents = async () => {
//       try {
//         setLoading(true);
//         const startDate = new Date();
//         const endDate = new Date();
//         endDate.setMonth(startDate.getMonth() + 1); // Fetch events for the next month
//         const events = await CalendarEvents.fetchAllEvents(startDate.toISOString(), endDate.toISOString());
//         console.log('Calendar events:', events);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching calendar events:', err);
//         setError('Error fetching calendar events. Please try again later.');
//         setLoading(false);
//       }
//     };

//     configureGoogleSignIn();
//     signIn();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {loading ? (
//         <ActivityIndicator size="large" />
//       ) : (
//         <>
//           {userData ? (
//             <Text>User data: {JSON.stringify(userData)}</Text>
//           ) : (
//             <Button title="Sign In" onPress={signIn} />
//           )}
//           <Button title="Get Calendar Events" onPress={getCalendarEvents} />
//           {error && <Text style={{ color: 'red' }}>{error}</Text>}
//         </>
//       )}
//     </View>
//   );
// };

// export default CalendarEventsScreen;