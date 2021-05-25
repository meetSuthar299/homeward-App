import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';

import Base64Image from '../../components/Base64Image';
import TextHW from '../../components/TextHW';
import useTheme from '../../hooks/useTheme';
import { dateToString } from '../../utils/date';
import { truncateLocation } from '../../utils/string';

const ListCardItem = ({ item }) => {
  const navigation = useNavigation();

  const { theme } = useTheme();

  const fadeAnimation = React.useRef(new Animated.Value(0)).current;

  const formattedLocation = truncateLocation(item.location);
  const formattedDate = dateToString(item.date.toDate());

  React.useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [fadeAnimation]);

  return (
    <Animated.View style={{ opacity: fadeAnimation }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SinglePost', item)}
        activeOpacity={0.5}
        style={{ paddingVertical: 10, borderColor: theme.backgroundTextColor }}
      >
        <TextHW
          numberOfLines={1}
          style={{
            marginHorizontal: 5,
            fontSize: 14,
            color: theme.backgroundTextColor
          }}
        >
          <FontAwesome5
            name='exclamation-circle'
            size={14}
            color={item.lost ? '#ff0000' : '#008800'}
          />

          {` ${
            item.lost ? `Lost in` : `Found at`
          } ${formattedLocation} • ${formattedDate}`}
        </TextHW>

        <TextHW
          numberOfLines={2}
          style={{
            marginHorizontal: 5,
            marginTop: 5,
            fontSize: 16,
            color: theme.backgroundTextColor
          }}
        >
          {item.title}
        </TextHW>

        <Base64Image
          source={item.uri}
          resizeMethod='resize'
          style={{
            marginTop: 10,
            height: 150
          }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ListCardItem;
