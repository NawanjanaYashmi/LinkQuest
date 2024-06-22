import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {Header, Icon} from 'react-native-elements';

const BudgetQuestionPage = ({isNew}: any) => {
  return (
    <View>
      <TouchableOpacity>
        <Text style={sty.skipbtn}>Skip</Text>
      </TouchableOpacity>

      <View style={sty.BudgeQuestionImge}>
        <Image
          source={require('../Images/BudgetQuestionImg.png')}
          style={sty.BudgeQuestionPageImg}
        />
      </View>

      <Text style={sty.headerTextBudgeQuestionPage}>
        Budget that you willing spend?
      </Text>

      <View style={sty.BqStyles}>
        <TouchableOpacity style={sty.BQCards}>
          <View
            style={[sty.icon, {backgroundColor: isNew ? '#BBE7BA' : '#75A82B'}]}
          />
          <Text style={sty.BQCardsText}>Best Experience (Cost-High)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.BQCards}>
          <View
            style={[sty.icon, {backgroundColor: isNew ? '#75A82B' : '#BBE7BA'}]}
          />
          <Text style={sty.BQCardsText}>Best Experience (Cost-High)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.BQCards}>
          <View
            style={[sty.icon, {backgroundColor: isNew ? '#75A82B' : '#BBE7BA'}]}
          />
          <Text style={sty.BQCardsText}>Best Experience (Cost-High)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={sty.BQCards}>
          <View
            style={[sty.icon, {backgroundColor: isNew ? '#75A82B' : '#BBE7BA'}]}
          />
          <Text style={sty.BQCardsText}>Best Experience (Cost-High)</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
      <View>
            <Image source={require('../Images/selectionImg2.png')} style={sty.BudgetQuestionPageImg1} />
        </View>
      </TouchableOpacity>

    </View>
  );
};

const sty = StyleSheet.create({
  skipbtn: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    right: 20,
    marginTop: 20,
  },
  BudgeQuestionImge: {
    alignItems: 'center',
    marginTop: 0,
  },
  BudgeQuestionPageImg: {
    width: 300,
    height: 300,
  },
  headerTextBudgeQuestionPage: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 30,
    color: '#2A2A2A',
  },
  BqStyles: {
    marginTop: 20,
  },

  BQCards: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    width: 350,
    height: 50,
    padding: 7,
    paddingLeft: 20,
    margin: 5,
    alignItems: 'center',
    elevation: 10,
    flexDirection: 'row',
    left: 19,
  },
  icon: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 20,
    overflow: 'hidden',
  },
  BQCardsText: {
    fontSize: 16,
    color: '#75A82B',
    fontWeight: '500',
  },
  BudgetQuestionPageImg1:{
    width: 50,
    height: 50,
    marginTop: 20,
    left: 320,
    marginBottom: 20,
  }
});

export default BudgetQuestionPage;