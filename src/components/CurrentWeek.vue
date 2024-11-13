
<script setup>
import { ref } from 'vue';


const days = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
const selectedDay = ref((new Date().getDay() + 6) % 7)

const emit = defineEmits(['update-current-date'])

function selectDay(index){
    selectAndUpdateCurrentDate(index)
    selectedDay.value = index
}

function selectAndUpdateCurrentDate(selectedDay) {
 emit('update-current-date', selectedDay)
}

</script>

<template>
    <div class="currentWeek">
        <div class="navigation-days">
            <span
            v-for="(day, index) in days"
            :key="index"
            :class="{selected: selectedDay === index}"
            @click="selectDay(index)"
            >{{ day }}</span>
        </div>
    </div>

</template>

<style scoped>
.current-week {
  text-align: center;
}

.navigation-days {
  display: flex;
  justify-content: space-evenly;
  border: 1px solid green;
  margin-bottom: 20px;
}

.navigation-days span {
  border: 1px solid lightblue;
  width: 40px;
  text-align: center;
  cursor: pointer;
  padding: 5px;
}

.navigation-days span.selected {
  background-color: lightblue;
  font-weight: bold;
  color: white;
}
</style>
