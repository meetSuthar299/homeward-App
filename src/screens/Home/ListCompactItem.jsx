import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

import Base64Image from '../../components/Base64Image';
import TextHW from '../../components/TextHW';
import useTheme from '../../hooks/useTheme';
import { dateToString } from '../../utils/date';
import { truncateLocation } from '../../utils/string';

const ListCompactItem = ({ item }) => {
  const navigation = useNavigation();

  const { theme } = useTheme();

  const fadeAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [fadeAnimation]);

  const formattedLocation = truncateLocation(item.location);
  const formattedDate = dateToString(item.date.toDate());

  return (
    <Animated.View style={{ opacity: fadeAnimation }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SinglePost', item)}
        activeOpacity={0.5}
        style={{ padding: 10 }}
      >
        <TextHW
          numberOfLines={1}
          style={{ fontSize: 14, color: theme.backgroundTextColor }}
        >
          <FontAwesome5
            name='exclamation-circle'
            size={14}
            color={item.lost ? '#ff0000' : '#008800'}
          />

          {` ${formattedLocation} • ${formattedDate}`}
        </TextHW>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5
          }}
        >
          <Base64Image
            source={item.uri}
            resizeMethod='resize'
            style={{
              flex: 4,
              height: 100,
              marginRight: 5
            }}
          />

          <TextHW
            numberOfLines={5}
            style={{ flex: 6, fontSize: 16, color: theme.backgroundTextColor }}
          >
            {item.title}
          </TextHW>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ListCompactItem;
