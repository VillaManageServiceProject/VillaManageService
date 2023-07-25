import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import Swiper from 'react-native-swiper';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import TextButton from '../components/TextButton';
import VillaSideMenu from '../fragments/VillaSideMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoticeBoardItem from '../components/NoticeBoardItem';

const NoticeBoardData = [
  {
    noticeType: 'important',
    title: '공지1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
  {
    noticeType: 'common',
    title: '게시글1',
    text: '내용..',
    createDate: '2023-07-21',
  },
];

export const NoticeBoardScreen = ({route}) => {
  const navigation = useNavigation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.foreground}>
        <View style={styles.header}>
          <View style={styles.left} />
          <View style={styles.center}>
            <Text style={styles.headerTitle}>게시판</Text>
          </View>
          <View style={styles.right}>
            <Icon
              IconType="Ionicons"
              IconName="menu"
              borderRadius={30}
              onPress={toggleSideMenu}
            />
          </View>
        </View>

        <View style={styles.body}>
          <View style={{borderRadius: 3, marginBottom: 15}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddNotice')}
              style={{
                paddingHorizontal: 5,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#1A73E840',
                borderRadius: 4,
              }}>
              <Ionicons
                name="add"
                size={25}
                color="#9AA0A6"
                // style={{marginRight: 10}}
              />
              <Text style={{paddingBottom: 2, fontColor: '#9AA0A6'}}>새글</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={NoticeBoardData}
            renderItem={({item}) => (
              <NoticeBoardItem
                noticeType={item.noticeType}
                title={item.title}
                text={item.text}
                createDate={item.createDate}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}
          />
        </View>
      </View>
      {isMenuOpen && <VillaSideMenu onClose={toggleSideMenu} />}
    </SafeAreaView>
  );
};

const Spacing = ({height}) => <View style={{height}} />;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    // backgroundColor: "red",
  },
  foreground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    // backgroundColor: "red",
  },
  header: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    zIndex: 2,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    zIndex: 2,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  notificationWrapper: {
    height: 30,
    borderRadius: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'yellow',
  },
  voteWrapper: {
    height: 250,
    borderRadius: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'yellow',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 20,
    backgroundColor: 'green',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'green',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'green',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendar: {
    flex: 1,
    width: '100%',
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  vote: {
    // flex: 1,
    width: '100%',
    // padding: 20,
    borderRadius: 25,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'red',
  },
  separator: {
    backgroundColor: '#e0e0e0',
    margin: 5,
    height: 1,
  },
});
