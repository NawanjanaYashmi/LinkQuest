import React from 'react';
import {Header, Icon, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const CategoryPage = ({navigation, isNew}: any) => {
  return (
    <View>
      <Header
        leftComponent={
          <Icon
            name="west"
            type="MaterialIcons"
            color="#2A2A2A"
            onPress={() => navigation.goBack()}
          />
        }
        centerComponent={{
          text: 'Categories',
          style: {color: '#2A2A2A', fontSize: 20, fontWeight: 'bold'},
        }}
        backgroundColor="white"
      />
    

      {/* // Categories n Text  line one. */}
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato1.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Cultural
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato2.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Beach
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato3.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Wildlife
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato4.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Nature
          </Text>
        </TouchableOpacity>
      </View>

      {/* // Categories n Text  line two. */}
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato1.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 11,
              fontWeight: '700',
            }}>
            Recreational
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato2.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Scenic
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato3.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato4.png')}
            style={{width: 30, height: 30, marginTop: 3}}
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

      {/* // Categories n Text  line three. */}
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato1.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 11,
              fontWeight: '700',
            }}>
            Temple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato2.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Lakes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato3.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato4.png')}
            style={{width: 30, height: 30, marginTop: 3}}
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

       {/* // Categories n Text  line five. */}
       <View style={{flexDirection: 'row', marginTop: 30}}>
        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato1.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 11,
              fontWeight: '700',
            }}>
            Temple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato2.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Lakes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato3.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato4.png')}
            style={{width: 30, height: 30, marginTop: 3}}
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

      {/* // Categories n Text  line four. */}
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato1.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 11,
              fontWeight: '700',
            }}>
            Temple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato2.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            Lakes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato3.png')}
            style={{width: 30, height: 30, marginTop: 3}}
          />
          <Text
            style={{
              marginTop: 5,
              color: '#696969',
              fontSize: 12,
              fontWeight: '700',
            }}>
            History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.CategoryPageSectionBtns}>
          <Image
            source={require('../Images/cato4.png')}
            style={{width: 30, height: 30, marginTop: 3}}
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

      
    </View>
  );
};

const sty = StyleSheet.create({
    CategoryPageSectionBtns: {
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
});

export default CategoryPage;
