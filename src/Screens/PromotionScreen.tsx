import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { ScrollView } from 'react-native';
import {Header, Icon, Image} from 'react-native-elements';
import {Avatar, Button, Card} from 'react-native-paper';

// import Icon from 'react-native-vector-icons/FontAwesome';


const PromotionScreen = () => {
  function alert(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView>
      <Header
        
        centerComponent={{
          text: 'Promotions',
          style: {color: '#2A2A2A', fontSize: 20, fontWeight: 'bold',marginTop: 10},
        }}
        backgroundColor="white"
      />

    
    

    <View style={sty.container}>
      
      

      <SearchBar
        style={sty.searchbar}
        placeholder="Search here"
        onPress={() => alert('onPress')}
        onChangeText={text => console.log(text)}
      />

      
        {/* //card one */}
      <Card style={sty.cardmain}>
        <Card.Cover
          source={require('../Images/ellepic.jpg')}
          style={{width: 355, height: 180}}
        />

        <Card.Content>
          <View style={sty.rowContainertextone}>
            <Text style={sty.cardtextoneleft}>
             
           <Image source={require('../Images/loicon.png')} style={{width: 18, height: 18, marginTop:10}} />
              98 Acres Resort & Spa
            </Text>
            <View style={sty.rowContainertextone}>
            <Image source={require('../Images/Star.png')} style={{width: 15, height: 15, marginTop:5,}} />
              <Text style={sty.cardtextoneright}>4.4 </Text>
            </View>
          </View>

          <Text style={sty.cardtextwo}>Jun 05 - Jun 19</Text>

          <View style={sty.rowContainertexttwo}>
            <Text style={sty.carddiscounttext}>15 %</Text>
            <Card.Actions>
              <Button style={sty.viewmoreBtn}
               onPress={() => {
                // navigation.navigate('DatesPickPage');
                console.log('Button pressed');
              }}
              >
                <Text style={sty.viewMoreText}>View More Details</Text>
              </Button>
            </Card.Actions>
          </View>
        </Card.Content>
      </Card>

      {/* //card two */}
      <Card style={sty.cardmain}>
        <Card.Cover
          source={require('../Images/kandalama.jpg')}
          style={{width: 355, height: 180}}
        />

        <Card.Content>
          <View style={sty.rowContainertextone}>
            <Text style={sty.cardtextoneleft}>
              
            <Image source={require('../Images/loicon.png')} style={{width: 18, height: 18, marginTop:10}} />
              Kandalama Hotel
            </Text>
            <View style={sty.rowContainertextone}>
            <Image source={require('../Images/Star.png')} style={{width: 15, height: 15, marginTop:5,}} />
              <Text style={sty.cardtextoneright}>3.8 </Text>
            </View>
          </View>

          <Text style={sty.cardtextwo}>Feb 02 - Feb 10</Text>

          <View style={sty.rowContainertexttwo}>
            <Text style={sty.carddiscounttext}>12 %</Text>
            <Card.Actions>
              <Button style={sty.viewmoreBtn}>
                <Text style={sty.viewMoreText}>View More Details</Text>
              </Button>
            </Card.Actions>
          </View>
        </Card.Content>
      </Card>


      {/* //card three */}
      <Card style={sty.cardmain}>
        <Card.Cover
          source={require('../Images/okay-ray.jpg')}
          style={{width: 355, height: 180}}
        />

        <Card.Content>
          <View style={sty.rowContainertextone}>
            <Text style={sty.cardtextoneleft}>
              
            <Image source={require('../Images/loicon.png')} style={{width: 18, height: 18, marginTop:10}} />
              Oak Ray Hotel
            </Text>
            <View style={sty.rowContainertextone}>
            <Image source={require('../Images/Star.png')} style={{width: 15, height: 15, marginTop:5,}} />
              <Text style={sty.cardtextoneright}>3.4 </Text>
            </View>
          </View>

          <Text style={sty.cardtextwo}>May 15 - May 19</Text>

          <View style={sty.rowContainertexttwo}>
            <Text style={sty.carddiscounttext}>25 %</Text>
            <Card.Actions>
              <Button style={sty.viewmoreBtn}>
                <Text style={sty.viewMoreText}>View More Details</Text>
              </Button>
            </Card.Actions>
          </View>
        </Card.Content>
      </Card>
      
    
    </View>
    </ScrollView>
  );
};

const sty = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  
  searchbar: {
    marginTop: 35,
    width: '90%',
    height: 40,
    backgroundColor: '#F5F5F5',
  },
  cardmain: {
    width: '90%',
    marginTop: 20,
    backgroundColor: '#F5F5F5',
  },
  rowContainertextone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardtextoneleft: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: '500',
    color: '#2A2A2A',
    right: 7,
    
  },
  cardtextoneright: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#F7B502',
  },
  cardtextwo: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2A2A2A',
  },
  carddiscounttext: {
    fontSize: 23,
    fontWeight: '800',
    color: '#2A2A2A',
    marginTop: 5,
  },
  rowContainertexttwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewmoreBtn: {
    backgroundColor: '#75A82B',
    borderWidth: 0,
    borderRadius: 15,
    left: 10,
  },
  viewMoreText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  icon: {
   marginTop: 6,
  
  

   
  },
});

export default PromotionScreen;