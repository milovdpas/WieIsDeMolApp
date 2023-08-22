import React, {ReactNode} from 'react';
import {ColorValue, StyleSheet, Text as RNText, TextStyle} from 'react-native';
import {Fonts, FontSize, Colors} from '../assets/Stylesheet';

type TextProps = {
  accessibilityLabel?: string;
  accessible?: boolean;
  children?: ReactNode;
  style?: TextStyle;
  color?: ColorValue;
  alignment?: 'auto' | 'left' | 'center' | 'right';
  fontStyle?: 'regular' | 'medium' | 'bold' | 'italic';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
};

const Text = ({
  accessibilityLabel,
  accessible = true,
  children,
  style = {},
  color = Colors.white,
  alignment = 'auto',
  fontStyle = 'medium',
  size = 'm',
}: TextProps) => {
  return (
    <RNText
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}
      importantForAccessibility={accessible ? 'yes' : 'no-hide-descendants'}
      style={[
        styles[fontStyle],
        styles[size],
        {color: color},
        {textAlign: alignment},
        style,
      ]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: Fonts.regular.fontFamily,
    fontWeight: Fonts.regular.fontWeight,
  },
  medium: {
    fontFamily: Fonts.medium.fontFamily,
    fontWeight: Fonts.medium.fontWeight,
  },
  bold: {
    fontFamily: Fonts.bold.fontFamily,
    fontWeight: Fonts.bold.fontWeight,
  },
  italic: {
    fontFamily: Fonts.italic.fontFamily,
    fontWeight: Fonts.italic.fontWeight,
  },
  xs: {
    fontSize: FontSize.extraSmall,
  },
  s: {
    fontSize: FontSize.small,
  },
  m: {
    fontSize: FontSize.medium,
  },
  l: {
    fontSize: FontSize.large,
  },
  xl: {
    fontSize: FontSize.extraLarge,
  },
});

export default Text;
