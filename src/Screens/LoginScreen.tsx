import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);
        if (!email || !password) {
            setError('Please fill in all fields.');
            setLoading(false); // Set loading to false on error
            return;
        }
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem('userEmail', email); // Save email to AsyncStorage
            setMessage('User logged in successfully!');

            navigation.navigate('OnBoardScreenOne');
            

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (
        <View style={sty.container}>
            <Image source={require('../Images/loginscreenLogo.png')} style={sty.logo} />
            <Text style={sty.LoginTopictext}>Login</Text>

            <View style={sty.NoheaderContainer}>
                <Text style={sty.Nologintexthead}>Enter your Email Address</Text>
            </View>
            <View style={sty.inputContainer}>
                <TextInput
                    style={sty.input}
                    placeholder="Email Address"
                    placeholderTextColor="#808080"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <Icon name="user" size={20} style={sty.icon} />
            </View>

            {/* Password part */}
            <View style={sty.PwheaderContainer}>
                <Text style={sty.Pwlogintexthead}>Enter your password</Text>
            </View>
            <View style={sty.inputContainer}>
                <TextInput
                    style={sty.input}
                    placeholder="Password"
                    placeholderTextColor="#808080"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Icon name="lock" size={20} style={sty.icon} />
            </View>

            {error && <Text style={sty.error}>{error}</Text>}
            {message && <Text style={sty.message}>{message}</Text>}
            {loading ? (
                <ActivityIndicator style={sty.loader} size="large" color="#75A82B" />
            ) : (
                <TouchableOpacity style={sty.loginbutton} onPress={handleLogin}>
                    <Text style={sty.loginbuttontext}>Log in</Text>
                </TouchableOpacity>
            )}

            {/* Don't have an account */}
            <TouchableOpacity>
                <Text style={sty.donthaveacctext}
                onPress={()=>{
                    navigation.navigate('SignUpScreen');
                }}
                >
                    Don't have an account? <Text style={sty.donthavesignup}>Sign up</Text>
                </Text>
            </TouchableOpacity>

            <Text style={sty.textor}>or</Text>

            <TouchableOpacity onPress={() => {
                navigation.navigate('NavigationBar');
                
            }}>
                <Text style={sty.guestbtn}>Continue as Guest</Text>
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

    LoginTopictext: {
        fontSize: 25,
        color: '#75A82B',
        fontWeight: '800',
        marginTop:0,
        marginBottom: 30,


      },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '75%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        color: '#000',
    },
    NoheaderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 105,
    },
    Nologintexthead: {
        fontSize: 15,
        fontWeight: '500',
        color: '#2A2A2A',
    },
    PwheaderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 150,
        marginTop: 20,
    },
    Pwlogintexthead: {
        fontSize: 15,
        fontWeight: '500',
        color: '#2A2A2A',
    },
    loginbutton: {
        width: '75%',
        backgroundColor: '#75A82B',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 30,
    },
    loginbuttontext: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    donthaveacctext: {
        color: '#696969',
        fontSize: 15,
        fontWeight: '400',
        marginTop: 10,
    },
    donthavesignup: {
        color: '#75A82B',
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    textor: {
        color: '#2A2A2A',
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10,
    },
    guestbtn: {
        color: '#9D9D9D',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 30,
        textDecorationLine: 'underline',
    },
    icon: {
        marginRight: 10,
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
    message: {
        color: 'green',
        marginBottom: 12,
    },
    loader: {
        marginTop: 20,
    },
});

export default LoginScreen;