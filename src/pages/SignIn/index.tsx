import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../../services/api';
import { useAuth } from '../../Contexts/auth';

import styles from './styles';

interface SignInFormData {
   email: string;
   password: string;
}

const SignIn: React.FC = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const { signed, signIn } = useAuth()

   const handleSignIn = useCallback(async (data: SignInFormData) => {
      signIn({
         email: data.email,
         password: data.password
      })
   }, [])

   return (
      <View style={styles.container}>
         <TouchableOpacity 
            style={styles.buttonContainer} 
            onPress={() => handleSignIn({ email, password })}>
            <Text>
               Login
            </Text>
         </TouchableOpacity>
      </View>
   )
}

export default SignIn;