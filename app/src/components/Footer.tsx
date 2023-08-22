import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {Colors} from '../assets/Stylesheet';
import Text from './Text';

type FooterProps = {
  start?: boolean;
  children?: ReactNode;
};

const Footer = ({start = false, children}: FooterProps) => {
  return <View
      style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '5%',
      }}>
      <Text size={'xs'} alignment={'center'} color={Colors.lightPurple}>
          This app is made by Milo van der Pas
      </Text>
  </View>;
};

export default Footer;
