import React, { useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import { TouchableOpacity, TextInput, Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleSignUp = async () => {
    setError(null);
    setMessage(null);
    setLoading(true); // Set loading to true when sign-up process starts

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false); // Set loading to false on error
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('User signed up successfully!');
      navigation.navigate('LoginScreen');
    } catch (err: any) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('The email address is already in use.');
          break;
        case 'auth/invalid-email':
          setError('The email address is not valid.');
          break;
        case 'auth/weak-password':
          setError('The password is too weak.');
          break;
        default:
          setError('An unknown error occurred. Please try again.');
          break;
      }
    } finally {
      setLoading(false); // Set loading to false after sign-up attempt
    }
  };

  return (
    <View style={sty.container}>
      <Image source={require('../Images/loginscreenLogo.png')} style={sty.logo} />
      <Text style={sty.SignUpTopictext}>Create Account</Text>

      {/* Sign Up Email Address */}
      <View style={sty.SignUpNoheaderContainer}>
        <Text style={sty.SignUpNologintexthead}>Enter your Email Address</Text>
      </View>
      <View style={sty.SignUpinputContainer}>
        <TextInput
          style={sty.SignUpinput}
          placeholder="Email Address"
          placeholderTextColor="#808080"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"

        />
         <Icon name="user" size={20} style={sty.icon} />
      </View>

      {/* Password part */}
      <View style={sty.SignUpPwheaderContainer}>
        <Text style={sty.SignUpPwlogintexthead}>Enter your password</Text>
      </View>
      <View style={sty.SignUpinputContainer}>
        <TextInput
          style={sty.SignUpinput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#808080"
          secureTextEntry
        />
         <Icon name="lock" size={20} style={sty.icon} />
      </View>

      {error && <Text style={sty.error}>{error}</Text>}
      {message && <Text style={sty.message}>{message}</Text>}

      <TouchableOpacity style={sty.sendOtpbutton} onPress={handleSignUp} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={sty.sendOtpbuttontext}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Already have an account? Sign in */}
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={sty.AlreadyHaveAcctext}>
          Already have an account? <Text style={sty.AlreadyHavesignup}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const sty = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignItems: 'center',
    marginTop: 40,
  },
  SignUpTopictext: {
    fontSize: 25,
    color: '#75A82B',
    fontWeight: '800',
  },
  SignUpNoheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 105,
    marginTop: 30,
  },
  SignUpNologintexthead: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2A2A2A',
  },
  SignUpinputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '75%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  SignUpinput: {
    flex: 1,
    color: '#000',
  },
  icon: {
    marginRight: 10,
  },
  SignUpPwheaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 150,
    marginTop: 20,
  },
  SignUpPwlogintexthead: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2A2A2A',
  },
  sendOtpbutton: {
    width: '75%',
    backgroundColor: '#75A82B',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  sendOtpbuttontext: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  AlreadyHaveAcctext: {
    color: '#696969',
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10,
  },
  AlreadyHavesignup: {
    color: '#75A82B',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  message: {
    color: 'green',
    marginBottom: 12,
  },
});

export default SignUpScreen;