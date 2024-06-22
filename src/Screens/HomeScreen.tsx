import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <ScrollView>
      <Image
        source={require('../Images/homeimg.png')}
        style={sty.homescreenImg}
      />

      <View style={sty.stylerowOne}>
        <Text
          style={{
            color: '#2A2A2A',
            fontSize: 20,
            fontWeight: 'bold',
            left: 15,
          }}>
          Categories
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ color: '#75A82B', fontWeight: '700', right: 15 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <TouchableOpacity style={sty.sectionBtns}>
          <Image
            source={require('../Images/cato1.png')}
            style={{ width: 30, height: 30, marginTop: 3 }}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Adventure
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.sectionBtns}>
          <Image
            source={require('../Images/cato2.png')}
            style={{ width: 30, height: 30, marginTop: 3 }}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Adventure
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.sectionBtns}>
          <Image
            source={require('../Images/cato3.png')}
            style={{ width: 30, height: 30, marginTop: 3 }}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Adventure
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.sectionBtns}>
          <Image
            source={require('../Images/cato4.png')}
            style={{ width: 30, height: 30, marginTop: 3 }}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Adventure
          </Text>
        </TouchableOpacity>
      </View>

      <View style={sty.stylerowOne}>
        <Text
          style={{
            color: '#2A2A2A',
            fontSize: 20,
            fontWeight: 'bold',
            left: 15,
          }}>
          Most Visited
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={{ color: '#75A82B', fontWeight: '700', right: 12 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('SigiriyaInfor');
            console.log('Button pressed');
          }}>
            <Image source={require('../Images/sigiriya.png')} style={{ width: 200, height: 150, marginTop: 10, borderRadius: 10, margin: 15 }} />
            <Text style={sty.imgText}>Sigiriya</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require('../Images/lake.png')} style={{ width: 200, height: 150, marginTop: 10, borderRadius: 10, marginRight: 15 }} />
            <Text style={sty.imgText}>Gregory Lake</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require('../Images/sigiriya.png')} style={{ width: 200, height: 150, marginTop: 10, borderRadius: 10, marginRight: 15 }} />
            <Text style={sty.imgText}>Sigiriya</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={sty.stylerowOne}>
        <Text
          style={{
            color: '#2A2A2A',
            fontSize: 20,
            fontWeight: 'bold',
            left: 15,
          }}>
          Top Events
        </Text>
        <TouchableOpacity>
          <Text style={{ color: '#75A82B', fontWeight: '700', right: 12 }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Image source={require('../Images/eventPic1.png')} style={{ width: 130, height: 130, marginTop: 10, borderRadius: 10, margin: 15 }} />
            <Text style={sty.imgText}>ElleTour</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require('../Images/eventPic2.png')} style={{ width: 130, height: 130, marginTop: 10, borderRadius: 10, marginRight: 15 }} />
            <Text style={sty.imgText}>Perahera</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={require('../Images/eventPic3.png')} style={{ width: 130, height: 130, marginTop: 10, borderRadius: 10, marginRight: 15 }} />
            <Text style={sty.imgText}>Galle Fort</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FAB
        style={sty.fab}
        icon="plus"
        onPress={() => {
          navigation.navigate('TagSelectionPage');
          console.log('FAB pressed');
        }}
      />
    </ScrollView>
  );
};

const sty = StyleSheet.create({
  homescreenImg: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  stylerowOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionBtns: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    width: 80,
    height: 75,
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    margin: 6,
    alignItems: 'center',
    elevation: 10,
    left: 13,
  },
  imgText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#75A82B'
  },
});

export default HomeScreen;