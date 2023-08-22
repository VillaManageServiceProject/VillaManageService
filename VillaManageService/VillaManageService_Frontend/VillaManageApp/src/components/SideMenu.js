import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextButton from '../components/TextButton';

export default SideMenu = props => {
  const navigation = useNavigation();

  const [isParentMenuPressed, setIsParentMenuPressed] = useState(false);

  const handleParentMenuPress = () => {
    setIsParentMenuPressed(!isParentMenuPressed);
  };

  return (
    <View style={styles.menuSection}>
      <TouchableOpacity
        onPress={handleParentMenuPress}
        style={[
          styles.parentMenu,
          {backgroundColor: isParentMenuPressed ? '#DFE1E5' : 'white'},
        ]}>
        <AntDesign
          name={props.IconName}
          size={25}
          color="#9AA0A6"
          style={{marginRight: 10}}
        />
        <Text>{props.title}</Text>
      </TouchableOpacity>
      {isParentMenuPressed && (
        <View style={styles.childMenuSection}>
          <Spacing height={15} />
          {Object.entries(props.childMenuList).map(([key, value]) => (
            <View>
              <TextButton
                text={key}
                onPress={() => navigation.navigate(value)}
              />
              <Spacing height={10} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const Spacing = ({height}) => <View style={{height}} />;

const styles = StyleSheet.create({
  parentMenu: {
    width: '100%',
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  childMenuSection: {
    // width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  menuSection: {
    // width: '70%',
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
});
