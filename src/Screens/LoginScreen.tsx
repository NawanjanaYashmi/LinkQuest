import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";



const LoginScreen = () => {
    return(
        <View style={sty.container}>
            <Image source={require('../Images/loginscreenLogo.png')} 
            style={sty.logo} 
            />

            <View style={sty.NoheaderContainer}>
                 <Text style={sty.Nologintexthead}>Enter your mobile number</Text>
            </View>
            <View style={sty.inputContainer}>
                    <TextInput
                            style={sty.input}
                            placeholder="Phone Number"
                            placeholderTextColor="#808080" 
                    />
                   <Icon name="user" size={20} style={sty.icon} />
                   
                    
            </View>

            {/* password part */}
            <View style={sty.PwheaderContainer}>
                 <Text style={sty.Pwlogintexthead}>Enter your password</Text>
            </View>
            <View style={sty.inputContainer}>
                <TextInput
                    style={sty.input}
                    placeholder="Password"
                    placeholderTextColor="#808080"
                    secureTextEntry={true}
                />
                <Icon name="user" size={20} style={sty.icon} />
            </View>

            {/* Login button part */}
            <TouchableOpacity style={sty.loginbutton}>
                <Text style={sty.loginbuttontext}>Login</Text>
            </TouchableOpacity>

            {/* Dont have an account */}

            <TouchableOpacity >
                <Text style={sty.donthaveacctext}>Don't have an account? <Text style={sty.donthavesignup}>Sign Up</Text> </Text>
            </TouchableOpacity>

            <Text style={sty.textor}>or</Text>

            <TouchableOpacity>
                <Text style={sty.guestbtn}>Continue as Guest</Text>
            </TouchableOpacity>

            
          
        </View>
    );
}

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
    donthavesignup:{
        color: '#75A82B',
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline',     
    },
    textor:{
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
      
   
   
    

})

export default LoginScreen;