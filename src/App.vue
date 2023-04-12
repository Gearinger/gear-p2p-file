<script setup lang="ts">
import { ref } from "vue";
import Avatar from "./components/Avatar.vue";

const avatarRef = ref(null)
const anotherName = ref<string>()
const sendText = ref<string>()

function connect() {
  console.log(anotherName.value);
  
  (avatarRef as any).value?.connect(anotherName.value)

}

function send() {
  (avatarRef as any).value?.sendText(anotherName.value)

}

</script>

<template>
  <Avatar ref="avatarRef" style="left:100px"></Avatar>

  <input v-model="anotherName" />
  <button @click="connect">connect</button>

  <input v-model="sendText" />
  <button @click="send">send</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
