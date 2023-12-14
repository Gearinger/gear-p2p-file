<script setup lang="ts">
import MainArea from "./view/MainArea.vue"
import ChatArea from "./view/ChatArea.vue";
import { ref } from "vue"
import { SendContentModel } from "./model/SendContentModel"


const mainAreaRef = ref<any>()
const chatArea = ref<any>()

function sendText(text: string) {
  mainAreaRef.value.sendTextToAll(text);
}

function sendFiles(selectFiles: File[]) {
  mainAreaRef.value.sendFilesToAll(selectFiles)
}

function recordContent(content: SendContentModel) {
  chatArea.value.recordContent(content)
}


</script>

<template>
  <div class="app">
    <ChatArea ref="chatArea" @send-text-event="sendText" @send-files-event="sendFiles"></ChatArea>
    <MainArea ref="mainAreaRef" @record-content="recordContent"></MainArea>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px){
    .app{
        flex-wrap: wrap;
    }
}
</style>
