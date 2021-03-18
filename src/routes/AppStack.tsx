import React from 'react';
import { View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack'
import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyStabs';

const { Navigator, Screen} = createStackNavigator()
const AppStack: React.FC = () => {
  return (
      <Navigator screenOptions={{ headerShown:false }}>
        <Screen name={'Landing'} component={Landing} />
        <Screen name={'GiveClasses'} component={GiveClasses} />
        <Screen name={'StudyTabs'} component={StudyTabs} />
      </Navigator>
    )
}

export default AppStack;