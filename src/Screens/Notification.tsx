import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import {  Image, Text } from 'react-native-elements';
import { Header, Icon } from 'react-native-elements';
import {Card} from 'react-native-paper';
import { ScrollView } from 'react-native';

const Notification = ({ navigation, isNew }: any) => {
  return (
    
    <ScrollView style={sty.container}>
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
          text: 'Notification',
          style: { color: '#2A2A2A', fontSize: 20, fontWeight: 'bold' },
        }}
        backgroundColor="white"
      />
      
      {/* Today Notifications n Text */}
      <Text style={sty.todayText}>Today</Text>
       
      {/* Notification Card  01*/}
      <View style={sty.IconAndCardViewContainer}>
        <View style={[sty.icon, { backgroundColor: isNew ? 'gray' : '#75A82B' }]} />

        <Card style={sty.customCardPackage}>
           <View style={sty.iconAndText}>
              <Image source={require('../Images/hotelicon.png')} style={{width: 30, height: 30,marginTop:15, }}/>
              <View style={sty.headerAndInfor}>
                <Text style={sty.cardtitle}>Hotel Booking</Text>
                <Text style={sty.carddescription}>Lorem ipsum dolor sit amet this for the consectetur. Suspendisse quam...</Text>
                <View style={sty.dateAndTime}>
                  <Text style={sty.textAndTimeText}>12:45 PM</Text>
                  <Text style={sty.textAndTimeText}>August 12, 2023</Text>
                </View>
              </View>      
           </View>   
        </Card>
      </View>

       {/* Notification Card  02*/}
       <View style={sty.IconAndCardViewContainer}>
        <View style={[sty.icon, { backgroundColor: isNew ? 'gray' : '#75A82B' }]} />

        <Card style={sty.customCardPackage}>
           <View style={sty.iconAndText}>
              <Image source={require('../Images/planeicon.png')} style={{width: 25, height: 25,marginTop:15, }}/>
              <View style={sty.headerAndInfor}>
                <Text style={sty.cardtitle}>Flight Booking</Text>
                <Text style={sty.carddescription}>Lorem ipsum dolor sit amet this for the consectetur. Suspendisse quam...</Text>
                <View style={sty.dateAndTime}>
                  <Text style={sty.textAndTimeText}>12:45 PM</Text>
                  <Text style={sty.textAndTimeText}>August 12, 2023</Text>
                </View>
              </View>      
           </View>   
        </Card>
      </View>



       {/* Today Notifications n Text */}
       <Text style={sty.todayText}>Yesterday</Text>
       
       {/* Notification Card 03 */}
       <View style={sty.IconAndCardViewContainer}>
         <View style={[sty.icon, { backgroundColor: isNew ? 'green' : 'gray' }]} />
 
         <Card style={sty.customCardPackage}>
            <View style={sty.iconAndText}>
               <Image source={require('../Images/loicon.png')} style={{width: 30, height: 30,marginTop:15, }}/>
               <View style={sty.headerAndInfor}>
                 <Text style={sty.cardtitle}>App Update</Text>
                 <Text style={sty.carddescription}>Lorem ipsum dolor sit amet this for the consectetur. Suspendisse quam...</Text>
                 <View style={sty.dateAndTime}>
                   <Text style={sty.textAndTimeText}>12:45 PM</Text>
                   <Text style={sty.textAndTimeText}>August 12, 2023</Text>
                 </View>
               </View>      
            </View>   
         </Card>
       </View>
 
        {/* Notification Card 04 */}
        <View style={sty.IconAndCardViewContainer}>
         <View style={[sty.icon, { backgroundColor: isNew ? 'green' : 'gray' }]} />
 
         <Card style={sty.customCardPackage}>
            <View style={sty.iconAndText}>
               <Image source={require('../Images/planeicon.png')} style={{width: 25, height: 25,marginTop:15, }}/>
               <View style={sty.headerAndInfor}>
                 <Text style={sty.cardtitle}>Flight Booking</Text>
                 <Text style={sty.carddescription}>Lorem ipsum dolor sit amet this for the consectetur. Suspendisse quam...</Text>
                 <View style={sty.dateAndTime}>
                   <Text style={sty.textAndTimeText}>12:45 PM</Text>
                   <Text style={sty.textAndTimeText}>August 12, 2023</Text>
                 </View>
               </View>      
            </View>   
         </Card>
       </View>

       {/* Notification Card 05*/}
       <View style={sty.IconAndCardViewContainer}>
         <View style={[sty.icon, { backgroundColor: isNew ? 'green' : 'gray' }]} />
 
         <Card style={sty.customCardPackage}>
            <View style={sty.iconAndText}>
               <Image source={require('../Images/hotelicon.png')} style={{width: 30, height: 30,marginTop:15, }}/>
               <View style={sty.headerAndInfor}>
                 <Text style={sty.cardtitle}>Hotel Booking</Text>
                 <Text style={sty.carddescription}>Lorem ipsum dolor sit amet this for the consectetur. Suspendisse quam...</Text>
                 <View style={sty.dateAndTime}>
                   <Text style={sty.textAndTimeText}>12:45 PM</Text>
                   <Text style={sty.textAndTimeText}>August 12, 2023</Text>
                 </View>
               </View>      
            </View>   
         </Card>
       </View>

       {/* Notification Card 06 */}
       <View style={sty.IconAndCardViewContainer}>
         <View style={[sty.icon, { backgroundColor: isNew ? 'green' : 'gray' }]} />
 
         <Card style={sty.customCardPackage}>
            <View style={sty.iconAndText}>
               <Image source={require('../Images/hotelicon.png')} style={{width: 30, height: 30,marginTop:15, }}/>
               <View style={sty.headerAndInfor}>
                 <Text style={sty.cardtitle}>Hotel Booking</Text>
                 <Text style={sty.carddescription}>Lorem ipsum dolor sit amet this for the consectetur. Suspendisse quam...</Text>
                 <View style={sty.dateAndTime}>
                   <Text style={sty.textAndTimeText}>12:45 PM</Text>
                   <Text style={sty.textAndTimeText}>August 12, 2023</Text>
                 </View>
               </View>      
            </View>   
         </Card>
       </View>

    </ScrollView>
  );
};

const sty = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',

  },
  todayText: {
    fontSize: 14,
    color: 'gray',
    paddingTop: 5,
    paddingLeft: 40
  },
  IconAndCardViewContainer: {
    paddingTop: 5,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  icon: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
   
  },
  customCardPackage: {
    width: 340,
    height: 110,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor:'#FFFFFF',
  },
  cardtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2A2A2A',
  },
  carddescription: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'justify',
    color: '#696969',
    
  },
  iconAndText:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerAndInfor:{
    paddingLeft: 20,
    marginTop: 10,
  },
  dateAndTime:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  textAndTimeText:{
    fontSize: 12,
    color: '#888888',
  }

});

export default Notification;