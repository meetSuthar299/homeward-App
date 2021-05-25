import React from 'react';
import { View } from 'react-native';
import {
  Shine,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia
} from 'rn-placeholder';

const COLOR = '#bbb';

const ListPlaceholderItem = ({ number }) => (
  <>
    {[...Array(number)].map((_, i) => (
      <View
        key={i}
        style={{
          flex: 1,
          marginVertical: 10
        }}
      >
        <Placeholder
          Animation={Shine}
          Left={() => (
            <PlaceholderMedia
              color={COLOR}
              size={75}
              style={{ marginRight: 5 }}
            />
          )}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <PlaceholderLine color={COLOR} height={10} width={70} noMargin />
            <PlaceholderLine color={COLOR} height={10} width={30} noMargin />
            <PlaceholderLine color={COLOR} height={10} noMargin />
            <PlaceholderLine color={COLOR} height={10} noMargin />
          </View>
        </Placeholder>
      </View>
    ))}
  </>
);

export default ListPlaceholderItem;
