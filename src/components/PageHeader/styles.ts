import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#8257e5',
      padding: 40

   },
   topBar:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
   },
   header:{
    flexDirection:'row'  ,
    alignItems:'center',
    justifyContent:'space-between'
   },
   title:{
      fontFamily:'Archivo_700Bold',
      color:'#fff',
      fontSize:24,
      lineHeight:32,
      maxWidth:160,
      marginVertical:24
   },
})

export default styles