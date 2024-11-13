<script setup>
import { onMounted, ref } from 'vue';
import CurrentWeek from './CurrentWeek.vue';
import HabitItem from './HabitItem.vue';
import { habitsList, loadHabits, dates, current_date } from './localStorage';

const habits = habitsList
const habit = ref('')


const addHabitToCurrentDate = (title) => {
  if(dates.value[current_date.value]){
    dates.value[current_date.value].push(title)
  } else {
    dates.value[current_date.value] = [title]
  }
}

const removeHabitFromCurrentDate = (title) => {
  if(dates.value[current_date.value]){
    const index = dates.value[current_date.value].indexOf(title)
    if(index !== -1) {
      dates.value[current_date.value].splice(index, 1)
    }
  }
}

function selectDate(newDate){
  current_date.value = newDate

  if(new Date(newDate) > new Date()) {
    if(!dates.value[newDate]){
      dates.value=[]
    } 
  }

}


onMounted(() => {
  loadHabits()
})


function addNewHabit() {
  
  if(habit.value.trim()) {
    addHabitToCurrentDate(habit.value.trim())
    habits.value.push({
      title: habit.value.trim(),
      completed: false,
    })
    habit.value = ''
  }

}

function deleteHabit(index){
  habits.value.splice(index, 1)
}

function editHabit(index, newTitle){
  habits.value[index].title =  newTitle
}

function toggleCompleted(index){
  habits.value[index].completed = !habits.value[index].completed
}

</script>

<template>
  <div class="habits">
    
  <CurrentWeek @update-current-date="selectDate($event)"/>

<br>
    <HabitItem v-for="(habitItem, index) in habits"
      :key="index"
      :title="habitItem.title"
      :completed="habitItem.completed"
      @edit-habit="editHabit(index, $event)"
      @delete-habit="deleteHabit(index)"
      @toggle-completed="toggleCompleted(index)"
    />
    
    <input type="text" v-model="habit" @keyup.enter="addNewHabit" placeholder="Add new habit"/>

    </div>
</template>

<style scoped></style>