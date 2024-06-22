import React from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

const SignUpScreen = () => {
    return(
        <View style={sty.container}>
            <Image source={require('../Images/loginscreenLogo.png')}
            style={sty.logo} 
            />
            <Text style={sty.SignUpTopictext}>Sign Up</Text>


            {/* Sign Up Phone Number */}
            <View style={sty.SignUpNoheaderContainer}>
                 <Text style={sty.SignUpNologintexthead}>Enter your mobile number</Text>
            </View>
            <View style={sty.SignUpinputContainer}>
                    <TextInput
                            style={sty.SignUpinput}
                            placeholder="Phone Number"
                    />
                   {/* <Icon name="user" size={20} style={sty.icon} /> */}                                  
            </View>

            {/* password part */}
            <View style={sty.SignUpPwheaderContainer}>
                 <Text style={sty.SignUpPwlogintexthead}>Enter your password</Text>
            </View>
            <View style={sty.SignUpinputContainer}>
                <TextInput
                    style={sty.SignUpinput}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                {/* <Icon name="user" size={20} style={sty.icon} /> */}
            </View>

             {/* Send OTP Code part */}
             <TouchableOpacity style={sty.sendOtpbutton}>
                <Text style={sty.sendOtpbuttontext}>Send OTP Code</Text>
            </TouchableOpacity>

            {/* Already have an account? Sign In */}
            <TouchableOpacity >
                <Text style={sty.AlreadyHaveAcctext}>Already have an account? <Text style={sty.AlreadyHavesignup}>Sign In</Text> </Text>
            </TouchableOpacity>


        </View>
        
        
    );
}

const sty = StyleSheet.create({
    container:{
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
        fontSize: 20,   
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
    AlreadyHavesignup:{
        color: '#75A82B',
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline',     
    },
});

export default SignUpScreen;