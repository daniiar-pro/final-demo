<script setup>
const props = defineProps(["title", "completed"]);
const emit = defineEmits("edit-habit", "delete-habit", "toggle-completed");

function handleEdit() {
  const newTitle = prompt("Edit habit: ", props.title);

  if (newTitle) {
    emit("edit-habit", newTitle);
  }
}

function handleDelete() {
  emit("delete-habit");
}

function handleToggleCompletion() {
  emit("toggle-completed");
}
</script>

<template>
  <div class="habitItem">
    <h4>{{ title }}</h4>
    <input
      type="checkbox"
      :checked="completed"
      @change="handleToggleCompletion"
    />
    <button @click="handleEdit">Edit</button>
    <button @click="handleDelete">Delete</button>
  </div>
</template>

<style scoped></style>
