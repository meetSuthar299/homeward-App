import { FontAwesome5 } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import TextHW from '../../components/TextHW';
import useAuth from '../../hooks/useAuth';
import useData from '../../hooks/useData';
import useTheme from '../../hooks/useTheme';
import ListCardItem from './ListCardItem';
import ListCompactItem from './ListCompactItem';
import ListPlaceholderItem from './ListPlaceholderItem';

const animation = require('../../../assets/animations/lottie_loading_dog.json');

const SVG_PATH_CARD = 'M1.75,9.38V1.75h16.5V9.38Zm0,8.87V10.62h16.5v7.63Z';
const SVG_PATH_COMPACT =
  'M1.75,5V1.75h16.5V5Zm0,4.43V6.18h16.5v3.2Zm0,8.87v-3.2h16.5v3.2Zm0-4.43v-3.2h16.5v3.2Z';

const keyExtractor = item => item.id;
const renderPostCardItem = ({ item }) => <ListCardItem item={item} />;
const renderPostCompactItem = ({ item }) => <ListCompactItem item={item} />;

const ItemSeparatorComponent = () => (
  <View
    style={{
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'gray'
    }}
  />
);

const ListEmptyComponent = Platform.select({
  ios: () => <LottieView source={animation} autoPlay loop />,
  android: () => <ListPlaceholderItem number={8} />
})();

const ListButton = ({ iconName, text, onPress, theme, style }) => (
  <TouchableOpacity style={[{ flexDirection: 'row' }, style]} onPress={onPress}>
    <FontAwesome5
      name={iconName}
      size={28}
      color={theme.isDark ? theme.primaryLightColor : theme.primaryColor}
    />

    {text && (
      <TextHW
        style={{
          alignSelf: 'center',
          marginLeft: 5,
          fontSize: 16,
          color: theme.backgroundTextColor
        }}
      >
        {text}
      </TextHW>
    )}
  </TouchableOpacity>
);

const List = ({ toggleFilterModal, toggleSignInModal, toggleNewPostModal }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [cardLayout, setCardLayout] = React.useState(false);

  const { authenticated } = useAuth();
  const { posts, fetchPosts, fetchingPosts } = useData();
  const { theme } = useTheme();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    await fetchPosts();

    setRefreshing(false);
  }, []);

  const ListHeaderComponent = () => (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10
        }}
      >
        <ListButton
          iconName='plus-circle'
          text='New Post'
          theme={theme}
          onPress={() =>
            authenticated ? toggleNewPostModal() : toggleSignInModal()
          }
        />

        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            style={{ marginHorizontal: 5 }}
            onPress={() => setCardLayout(prev => !prev)}
          >
            <Svg
              viewBox='0 0 20 20'
              height='28'
              width='28'
              preserveAspectRatio='none'
            >
              <Path
                d={cardLayout ? SVG_PATH_CARD : SVG_PATH_COMPACT}
                fill={
                  theme.isDark ? theme.primaryLightColor : theme.primaryColor
                }
              />
            </Svg>
          </TouchableOpacity>

          <ListButton
            iconName='sliders-h'
            onPress={toggleFilterModal}
            theme={theme}
            style={{ marginHorizontal: 5 }}
          />
        </View>
      </View>

      <ItemSeparatorComponent />
    </>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={keyExtractor}
      renderItem={cardLayout ? renderPostCardItem : renderPostCompactItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={
        fetchingPosts && Platform.select({ ios: { height: '100%' } })
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          title='Trained prairie dogs are fetching the posts...'
          titleColor={theme.backgroundTextColor}
          tintColor={
            theme.isDark ? theme.primaryLightColor : theme.primaryColor
          }
          colors={[theme.primaryTextColor]}
          progressBackgroundColor={theme.primaryColor}
        />
      }
      indicatorStyle={theme.isDark ? 'white' : 'black'}
    />
  );
};

export default React.memo(List);
