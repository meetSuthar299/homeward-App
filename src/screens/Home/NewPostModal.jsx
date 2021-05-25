import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import TextHW from '../../components/TextHW';
import useTheme from '../../hooks/useTheme';

const NewPostModalButton = ({ iconName, iconColor, text, color, onPress }) => (
  <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
    <FontAwesome5
      name={iconName}
      size={75}
      color={iconColor}
      style={{ marginHorizontal: 25 }}
    />
    <TextHW style={{ fontSize: 18, color }}>{text}</TextHW>
  </TouchableOpacity>
);

const NewPostModal = ({ newPostModalVisible, toggleNewPostModal }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  return (
    <Modal
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: 0
      }}
      isVisible={newPostModalVisible}
      animationIn='fadeInDown'
      animationInTiming={100}
      animationOut='fadeOutUp'
      animationOutTiming={100}
      backdropOpacity={0.5}
      onBackdropPress={toggleNewPostModal}
      backdropTransitionOutTiming={100}
      onSwipeComplete={toggleNewPostModal}
      swipeDirection={['up', 'down']}
      swipeThreshold={50}
      hideModalContentWhileAnimating
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 10,
          marginTop: headerHeight,
          backgroundColor: theme.secondaryBackgroundColor
        }}
      >
        <NewPostModalButton
          iconName='cat'
          iconColor='#ff0000'
          text='Lost a Pet'
          color={theme.backgroundTextColor}
          onPress={() => {
            toggleNewPostModal();
            navigation.navigate('NewPost', { isLost: true });
          }}
        />

        <NewPostModalButton
          iconName='dog'
          iconColor='#008800'
          text='Found a Pet'
          color={theme.backgroundTextColor}
          onPress={() => {
            toggleNewPostModal();
            navigation.navigate('NewPost', { isLost: false });
          }}
        />
      </View>
    </Modal>
  );
};

export default React.memo(NewPostModal);
