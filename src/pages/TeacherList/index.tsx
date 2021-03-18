import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [teachers, setTeachers] = useState([])
  const [subject, setSubject] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  function hanfleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

function loadFavorites(){
  AsyncStorage.getItem('favorites').then(response => {
    if (response) {
      const favoritedTeachers = JSON.parse(response)
      const favoritedTeachersIds = favoritedTeachers.map((teacher:Teacher) => {
        return teacher.id
      })
      setFavorites(favoritedTeachersIds)
    }
  })
}

useFocusEffect(
  useCallback(() => {
      loadFavorites()
  },[])
)

  async function handleFiltersSubmit() {
    loadFavorites()
    await api.get('classes', {
      params: {
        subject,
        weekDay,
        time
      }
    }).then(response => {
      setTeachers(response.data)
      response.data.length > 0 && setIsFiltersVisible(false)
    })
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title='Proffys disponíveis'
        headerRight={(
          <BorderlessButton onPress={hanfleToggleFiltersVisible}>
            <Icon name='filter' size={20} color='#fff' />
          </BorderlessButton>
        )}
      >

        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder='Qual a matéria'
              placeholderTextColor={'#c1bccc'}
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Qual o dia'
                  placeholderTextColor={'#c1bccc'}
                  value={weekDay}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Qual o horário'
                  placeholderTextColor={'#c1bccc'}
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 250,
        }}
      >
        {teachers.map((teacher: Teacher) => (
        <TeacherItem 
          key={teacher.id} 
          teacher={teacher} 
          favorited={favorites.includes(teacher.id)}
        />
        ))}
      </ScrollView>
    </View>
  )
}

export default TeacherList;