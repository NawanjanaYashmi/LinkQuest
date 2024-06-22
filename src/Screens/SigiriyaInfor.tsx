import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SigiriyaInfor = ({navigation}: any) => {
  return (
    <View>
      <Image source={require('../Images/si.png')} style={sty.homescreenImg} />

      <View style={{margin: 20}}>
        <Text style={{fontSize: 23, fontWeight: '700', color: '#200E32'}}>
          Sigiriya
        </Text>
        <View style={sty.locationContainer}>
          <Icon name="map-marker" size={20} color="#999" style={sty.icon} />
          <Text style={sty.locationText}>Dambulla, Sri Lanka</Text>
        </View>
      </View>

      <View style={{marginTop: 10, margin: 20}}>
        <Text style={{fontSize: 17, fontWeight: '700'}}>Open/Close Time</Text>
        <Text style={{textAlign:'justify',fontSize:15,marginTop:5,}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, arcu
          dictumst habitant vel ut et pellentesque. Ut in egestas blandit netus
          in scelerisque. Eget lectus ultrices pellentesque id.
        </Text>
      </View>

      <View style={{marginTop: 10, margin: 20}}>
        <Text style={{fontSize: 17, fontWeight: '700'}}>About</Text>
        <Text style={{textAlign:'justify',fontSize:15,marginTop:5,}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu, arcu
          dictumst habitant vel ut et pellentesque. Ut in egestas blandit netus
          in scelerisque. Eget lectus ultrices pellentesque id.
        </Text>
      </View>
    </View>
  );
};

const sty = StyleSheet.create({
  homescreenImg: {
    width: 410,
    height: 300,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  icon: {
    marginRight: 15,
  },
  locationText: {
    fontSize: 16,
    color: '#200E32',
  },
});

export default SigiriyaInfor;
