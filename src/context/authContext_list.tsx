import React, { createContext, use, useContext, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Modalize } from "react-native-modalize";
import { style } from "../pages/login/styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Input } from "../components/Input";
import { themes } from "../global/themes";
import { Flag } from "../components/Flag";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";   

export const AuthContextList:any = createContext({});

const flags = [
    {caption: 'urgente', color:themes.colors.red},
    {caption: 'opcional', color:themes.colors.blueLight}
]

export const AuthProviderList = (props:any) => {
    const modalizeRef = useRef<Modalize>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFlag, setSelectedFlag] = useState('urgente');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date()); 
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [item, setItem] = useState(0);
    const [taskList, setTaskList] = useState([]);

    const onOpen = ()=>{
        modalizeRef?.current?.open()
    };

    const onClose = ()=>{
        modalizeRef?.current?.close()
    }

    useEffect(()=>{
        get_taskList();
    },[])

    const _renderFlag  =() => {
        return (
            flags.map((item,index) => (
                <TouchableOpacity key={index}
                onPress={()=>{
                    setSelectedFlag(item.caption)
                }}
                >
                    <Flag 
                        caption={item.caption}
                        color={item.color}
                       selected={item.caption === selectedFlag}
                    />
                </TouchableOpacity>
            ))
        )
    }

    const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

    const handleTimeChange = (time: Date) => {
    setSelectedTime(time);
  };

  
  const handlerSave = async () => {
    if (!title || !description || !selectedFlag ) {
      return Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
         try {
                const newItem = {
                    item: Date.now(),
                    title,
                    description,
                    flag: selectedFlag,
                    timeLimit: new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate(),
                        selectedTime.getHours(),
                        selectedTime.getMinutes()
                    ), toString
                }

                const storangeData = await AsyncStorage.getItem('taskList');

                let taskList = storangeData ? JSON.parse(storangeData) : [];

                taskList.push(newItem);
                await AsyncStorage.setItem('taskList', JSON.stringify(taskList))

                setTaskList(taskList)
                setData()
                onClose()

        } catch (error) {
            console.log("Erro ao salvar item:", error);
        }
      }

    const setData = () => {
        setTitle('');
        setDescription('');
        setSelectedFlag('urgente');
        setItem(0);
        setSelectedDate(new Date());
        setSelectedTime(new Date());
    }

    async function get_taskList() {
        try {
            const storangeData = await AsyncStorage.getItem('taskList');
            const taskList = storangeData ? JSON.parse(storangeData) : [];
            setTaskList(taskList);
        } catch (error) {
            console.log("Erro ao carregar a lista de tarefas:", error);
        }
        
    }

    const _container = () =>{
        return (
            <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>onClose()}>
                            <MaterialIcons 
                                name="close"
                                size={30}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>Criar Tarefa</Text>
                        <TouchableOpacity onPress={()=>handlerSave()}>
                            <AntDesign 
                                name="check"
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Input 
                            title="Titulo:"
                            labelStyle={styles.label}
                            value={title}
                            onChangeText={setTitle}
                        />
                        <Input 
                            title="Descrição: "
                            labelStyle={styles.label}
                            height={100}
                            multiline
                            numberOfLines={5}
                            value={description}
                            onChangeText={setDescription}
                            textAlignVertical="top"
                        />

                        <View style={{width:'40%'}}>
                            <View style={{flexDirection:'row', gap:10, width:'100%'}}>
                                <TouchableOpacity onPress={()=> setShowDatePicker(true)} style={{width:200}}>
                                    <Input
                                    title="Data Limite"
                                    labelStyle={styles.label}
                                    editable={false}
                                    value={selectedDate.toLocaleDateString()}
                                    onPress={()=> setShowDatePicker(true)}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:120}} onPress={()=> setShowTimePicker(true)}>
                                    <Input
                                    title="Hora Limite"
                                    labelStyle={styles.label}
                                    editable={false}
                                    value={selectedTime.toLocaleTimeString()}
                                    onPress={()=> setShowTimePicker(true)}
                                    />
                                </TouchableOpacity>
                            </View>
                            <CustomDateTimePicker
                            onDateChange={handleDateChange}
                            setShow={setShowDatePicker}
                            show={showDatePicker}
                            type={'date'}
                            />
                            <CustomDateTimePicker
                            onDateChange={handleTimeChange}
                            setShow={setShowTimePicker}
                            show={showTimePicker}
                            type={'time'}
                            />
                        </View>
                        <View style={styles.containerFlag}>
                            <Text style={styles.label}> Flags: </Text>
                            <View style={styles.Rowflags}>
                                {_renderFlag()}

                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }

    return (
        <AuthContextList.Provider value= {{onOpen,taskList}}>
            {props.children}
            <Modalize 
            ref={modalizeRef}
            childrenStyle={{height: Dimensions.get('window').height * 1.8}}
            adjustToContentHeight={true}
            >
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
    )

}

export const useAuth = () => useContext(AuthContextList);
export const styles = StyleSheet.create({
    container:{
        width:'100%'
    },
    header:{
        width:'100%',
        height:40,
        paddingHorizontal:40,
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    },
    content:{
        width:'100%',
        paddingHorizontal:20
    },
    containerFlag:{
        width:'100%',
        padding:10
    },
    label:{
        fontWeight:'bold',
        color: '#000'
    },
    Rowflags:{
        flexDirection:'row',
        gap:10,
        marginTop:10

    }

})