import React from 'react';
import { View } from 'react-native';

import HeaderButton from '../../components/HeaderButton';
import ModalPrompt from '../../components/ModalPrompt';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import FilterModal from './FilterModal';
import List from './List';
import NewPostModal from './NewPostModal';

const Home = ({ navigation }) => {
  const [filterModalVisible, setFilterModalVisible] = React.useState(false);
  const [signInModalVisible, setSignInModalVisible] = React.useState(false);
  const [newPostModalVisible, setNewPostModalVisible] = React.useState(false);

  const { authenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  React.useLayoutEffect(
    () =>
      navigation.setOptions({
        headerRight: () => (
          <HeaderButton
            iconName='user-circle'
            onPress={() =>
              navigation.navigate(authenticated ? 'UserProfile' : 'SignIn')
            }
          />
        ),
        headerLeft: () => <HeaderButton iconName='paw' onPress={toggleTheme} />
      }),
    [navigation, authenticated]
  );

  const toggleFilterModal = React.useCallback(
    () => setFilterModalVisible(prev => !prev),
    []
  );

  const toggleSignInModal = React.useCallback(
    () => setSignInModalVisible(prev => !prev),
    []
  );

  const toggleNewPostModal = React.useCallback(
    () => setNewPostModalVisible(prev => !prev),
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <FilterModal
        filterModalVisible={filterModalVisible}
        toggleFilterModal={toggleFilterModal}
      />

      <ModalPrompt
        isVisible={signInModalVisible}
        onAccept={() => {
          toggleSignInModal();
          navigation.navigate('SignIn');
        }}
        onCancel={toggleSignInModal}
        promptText='You need to sign-in to create a new post!'
        acceptText='Sign In'
        cancelText='Cancel'
      />

      <NewPostModal
        newPostModalVisible={newPostModalVisible}
        toggleNewPostModal={toggleNewPostModal}
      />

      <List
        toggleFilterModal={toggleFilterModal}
        toggleSignInModal={toggleSignInModal}
        toggleNewPostModal={toggleNewPostModal}
      />
    </View>
  );
};

export default Home;
