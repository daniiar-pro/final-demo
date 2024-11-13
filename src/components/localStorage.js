import { ref, watch } from 'vue';

export const habitsList = ref([]);
export const dates = ref({});
export const current_date = ref(new Date().toISOString().slice(0, 10));

export function loadHabits() {
  const storedHabits = JSON.parse(localStorage.getItem('habitsList') || '[]');
  const storedDates = JSON.parse(localStorage.getItem('dates') || '[]');

  dates.value = storedDates[current_date.value].push(
    habitsList.value.map(habit => habit.title)
  );

  habitsList.value = storedHabits.map(habit => ({
    ...habit,
    completed: habit.completed,
  }));
}

watch(
  habitsList,
  newHabits => {
    const habitsStore = newHabits.map(habit => ({
      title: habit.title,
      completed: habit.completed,
    }));

    localStorage.setItem('habitsList', JSON.stringify(habitsStore));
  },
  { deep: true }
);

watch(
  dates,
  newDates => {
    const datesStore = newDates[current_date].push(
      habitsList.value.map(habit => habit.title)
    );
    localStorage.setItem('dates', JSON.stringify(datesStore));
  },
  { deep: true }
);
