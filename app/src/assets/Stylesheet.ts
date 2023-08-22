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
  black: '#000000',
  white: '#FFFFFF',
  grey: '#7b7b7b',
  purple: '#230233',
  lightPurple: '#75627B',
  red: '#FF5644',
  pink: '#FF04CD',
  orange: '#FF7F0D',
};

export const Border = {
  rounded: 10,
  round: 50,
};
