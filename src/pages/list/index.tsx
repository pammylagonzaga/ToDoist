import React, { useContext, useRef } from "react";

import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import { style } from "./styles";
import { Input } from "../../components/Input";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Ball } from "../../components/Ball";
import { Flag } from "../../components/Flag";
import { themes } from "../../global/themes";
import { AuthContextList } from "../../context/authContext_list";
import { AuthContextType, PropCard } from "../../global/Props";
import { formatDateToBR } from "../../global/functions";
import { Swipeable } from "react-native-gesture-handler";

export default function List(){
    const {taskList} = useContext<AuthContextType>(AuthContextList)
    const swipeableRefs = useRef<any[]>([]);
    //nao tinha esse useRef, ai quando eu abria um card e depois abria outro, o primeiro nao fechava, ai com esse useRef eu consigo fechar o card anterior quando abrir outro
    const renderRightActions = () => {
        return(<View style={style.button}>
            <AntDesign 
            name="delete" 
            size={24} 
            color={'white'} />
        </View>)
    }

    const _renderCard = (item:PropCard, index:any)=>{
        const color = item.flag == 'opcional' ? themes.colors.blueLight : themes.colors.red
        return(
            <Swipeable
                ref={(ref) => { swipeableRefs.current[index] = ref; }}
                key={index}
                renderRightActions={renderRightActions}
            >
            <View style={style.card}>
                <View style={style.rowCard}>
                    <View style={style.rowCardLeft}>
                        <Ball color={color}/>
                        <View>
                            <Text style={style.titleCard}>{item.title}</Text>
                            <Text style={style.descriptionCard}>{item.description}</Text>
                            <Text style={style.descriptionCard}> até {formatDateToBR(item.timeLimit)}</Text>
                        </View>
                    </View>
                        <View>
                        <Flag 
                        caption={item.flag} 
                        color= {color}/>
                        </View>
                </View>
            </View>
            </Swipeable>
        )
    }

    return(
    <View style={style.container}>
        <View style={style.header}>
            <Text style={style.greeting}> Bom dia <Text style={{fontWeight: 'bold'}}>Pammyla</Text> </Text>    
                <View style={style.boxInput}>
                    <Input 
                    IconLeft={MaterialIcons}
                    iconLeftName="search"
                    />
                </View>
        </View>
        <View style={style.boxList}>
            <FlatList
                data={taskList}
                style={{marginTop:40, paddingHorizontal:30}}
                keyExtractor={(item,index)=> item.item.toString()}
                renderItem={({item,index})=> {return (_renderCard(item, index))}
                }
            />
        </View>
    </View>
    )
}