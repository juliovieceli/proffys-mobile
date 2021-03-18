import React, { createContext, useCallback, useState, useEffect, useContext } from 'react'
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage'

interface SignInCredentials {
   email: string;
   password: string;
}
interface UserProps {
   email:string;
   password:string;

}
interface AuthContextData {
   signed: boolean;
   user: UserProps | null;
   loading:boolean;
   signIn(credentials: SignInCredentials): Promise<void>;
   signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [user, setUser] = useState<UserProps | null>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {

      async function loadStorageData() {
         const storagedUser = await AsyncStorage.getItem('@Proffy:user')
         const storagedToken = await AsyncStorage.getItem('@Proffy:token')

         if(storagedUser && storagedToken){
            api.defaults.headers.Authorization = `Baerer ${storagedToken}`
            setUser(JSON.parse(storagedUser))
            setLoading(false)
         }
         
      }
      loadStorageData()
   }, [])

   const signIn = useCallback(async ({ email, password }) => {
      /*       api.post('post', {
               email,
               password
            }).then(response => {
               setUser(response.data)
            }) */
      let user = {
         email: 'Julio',
         password: 'aaaa'
      }
      let token = 'dhiasvdjhvsajhdvshajucdjhuasvhdchdcj'

      setTimeout(() => {
         setUser(user)
      }, 2000);

      api.defaults.headers.Authorization = `Baerer ${token}`

      await AsyncStorage.setItem('@Proffy:user', JSON.stringify(user))
      await AsyncStorage.setItem('@Proffy:token', token)

   }, [])

   const signOut = useCallback(async () => {
      await AsyncStorage.clear().then(()=>{
         setUser(null)
      })
   }, [])

   return (
      <AuthContext.Provider value={{ signed: !!user, user ,loading,  signIn, signOut }}>
         {children}
      </AuthContext.Provider>
   )
}

export  function useAuth () {
   const context = useContext(AuthContext)

   return context
}
