import React, { useState } from "react";

import { 
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
 } from "react-native";

 import { styles } from "./styles";
 import Logo from '../../assects/logo.png';
 import { MaterialIcons } from '@react-native-vector-icons/material-icons';
 import { themes } from "../../global/themes";
 
export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

 async function getLogin(){
    try {
      setLoading(true);
      
      if(!email || !password){
        return Alert.alert('Preencha todos os campos');
      }

      setTimeout(() => {
        if(email === 'pammyla.gonzaga@gmail.com' && password === '123456'){
              Alert.alert("Login realizado com sucesso!");
            } else {
              Alert.alert("E-mai ou senha incorretos");
            }
            setLoading(false);
      }, 2000);


    } catch (error) {
      console.log(error);
    }
  }

  return (
       <View style={styles.container}>
      
            <View style={styles.boxTop}>
              <Image 
              source={Logo}
              style={styles.logo}
              resizeMode="contain"
              />
              <Text style={styles.titulo}>Bem Vindo de Volta</Text>
            </View>

            <View style={styles.boxMid}>
              <Text style={styles.titulo}>ENDEREÇO DE E-MAIL</Text>
              <View style={styles.BoxInput}>
                 <TextInput 
                          style={styles.Input}
                          value={email} 
                          onChangeText={(e)=>setEmail(e)}
                          placeholder="Digite seu e-mail aqui"
                    />
                 <MaterialIcons style={styles.Input}
                          name="email" 
                          size={20} 
                          color={themes.colors.gray}
                    />
              </View>
              <Text style={styles.titulo}>SENHA</Text>
                <View style={styles.BoxInput}>
                 <TextInput 
                          style={styles.Input} 
                          value={password}
                          onChangeText={setPassword}
                          placeholder="Digite sua senha aqui"
                    />
                  <MaterialIcons style={styles.Input}
                          name="lock" 
                          size={20} 
                          color={themes.colors.gray} 
                    />
                 </View>
            </View>

            <View style={styles.boxBottom}>
                <TouchableOpacity style={styles.Button} onPress={() => getLogin()}>
                    {
                    loading? 
                        <ActivityIndicator color={"#ffff"} size={"small"}/> 
                    :
                        <Text style={styles.textButton}>Entrar</Text>
                    }
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>Não tem conta?<Text style={{color:themes.colors.primary}}> Crie agora!</Text></Text>
        </View>
  )
}