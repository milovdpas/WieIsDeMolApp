type FontType = {
  fontFamily: string;
  fontWeight:
    | '400'
    | '500'
    | '700'
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '600'
    | '800'
    | '900'
    | undefined;
};

export const Fonts = {
  regular: {
    fontFamily: 'TT Commons Pro',
    fontWeight: '400',
  } as FontType,
  medium: {
    fontFamily: 'TT Commons Pro',
    fontWeight: '500',
  } as FontType,
  bold: {
    fontFamily: 'TT Commons Pro',
    fontWeight: '700',
  } as FontType,
  italic: {
    fontFamily: 'Reckless-LightItalic',
    fontWeight: '400',
  } as FontType,
};

export const FontSize = {
  extraSmall: 12,
  small: 16,
  medium: 20,
  large: 24,
  extraLarge: 32,
};

export const Spacing = {
  none: 0,
  extraSmall: 5,
  small: 10,
  medium: 20,
  large: 30,
  extraLarge: 50,
};

export const Colors: any = {
  black: '#111112',
  white: '#E8E8E8',
  green: '#21C452',
  darkgreen: '#168236',
  grey: '#7b7b7b',
  purple: '#230233',
  lightPurple: '#75627B',
  red: '#FF5644',
  pink: '#FF04CD',
  orange: '#FF7F0D',
  primary: '#111112',
  secondary: '#168236',
  textColor: '#E8E8E8',
  transparent: 'transparent'
};

export const Gradients: any = {
  primary: [Colors.darkgreen, Colors.green],
  secondary: [Colors.black, Colors.green, Colors.black]
}

export const Border = {
  rounded: 10,
  round: 50,
};
