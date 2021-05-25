import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';

import useTheme from '../hooks/useTheme';
import TextHW from './TextHW';

const ModalPromptButton = ({ text, color, theme, onPress, style }) => (
  <TouchableHighlight
    activeOpacity={1}
    underlayColor='rgba(0, 0, 0, 0.25)'
    onPress={onPress}
    onLongPress={onPress}
    style={{
      flex: 1,
      paddingVertical: 12,
      borderTopWidth: StyleSheet.hairlineWidth * 1,
      borderColor: theme.isDark ? 'gray' : 'lightGray',
      ...style
    }}
  >
    <TextHW
      style={{
        textAlign: 'center',
        fontSize: 16,
        color
      }}
    >
      {text}
    </TextHW>
  </TouchableHighlight>
);

const ModalPrompt = ({
  isVisible,
  onAccept,
  onCancel,
  promptText,
  acceptText = 'Accept',
  cancelText = 'Cancel'
}) => {
  const { theme } = useTheme();

  return (
    <Modal
      isVisible={isVisible}
      animationIn='fadeIn'
      animationOut='fadeOut'
      animationOutTiming={1}
      backdropOpacity={0.7}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
    >
      <View
        style={{
          borderRadius: 15,
          backgroundColor: theme.secondaryBackgroundColor
        }}
      >
        <TextHW
          style={{
            padding: 20,
            fontSize: 16,
            textAlign: 'center',
            color: theme.backgroundTextColor
          }}
        >
          {promptText}
        </TextHW>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <ModalPromptButton
            text={cancelText}
            color='#ff0000'
            theme={theme}
            onPress={onCancel}
            style={{
              borderBottomLeftRadius: 15,
              borderRightWidth: StyleSheet.hairlineWidth
            }}
          />

          <ModalPromptButton
            text={acceptText}
            color='#1E90FF'
            theme={theme}
            onPress={onAccept}
            style={{
              borderBottomRightRadius: 15
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalPrompt;
