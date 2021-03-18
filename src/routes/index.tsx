import React, { useContext } from 'react';
import AuthStack from './AuthStack';
import {useAuth} from '../Contexts/auth';
import AppStack from './AppStack';
import { View, ActivityIndicator } from 'react-native';


// import { Container } from './styles';

const Routes: React.FC = () => {
   const { signed, loading } = useAuth()
   if(loading){
      return(
         <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size='large' color='#6666'/>
         </View>
      )
   }
   return signed ? <AppStack /> : <AuthStack />
}

export default Routes;