import {
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {Colors, FontSize, Spacing} from '../../assets/Stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

type CloseButtonProps = {
  size?: number | undefined;
  iconColor?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  accessibilityHint?: string;
  style?: TextStyle;
};

const CloseButton = ({
  size = FontSize.extraLarge,
                       iconColor = Colors.black,
  onPress,
  accessibilityHint,
  style = {},
}: CloseButtonProps) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      hitSlop={styles.hitslop}>
      <Icon name="close" size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hitslop: {
    top: Spacing.small,
    right: Spacing.small,
    bottom: Spacing.small,
    left: Spacing.small,
  },
});
export default CloseButton;
