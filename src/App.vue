<script setup lang="ts">
import { onMounted, ref } from "vue";
import User from "./components/User.vue";
import FileUtil from "./util/FileUtil"

const userRef = ref<any>(null)
const anotherName = ref<string>("Tom")
const sendText = ref<string | ArrayBuffer | null>("Nice to meet you!")
const chatContent = ref<string>("")

function connect(name: string) {
  userRef.value.connect(name)
}

async function selectFiles(event: any) {  
  const fileList = event.target.files;
  if (!fileList?.length) return

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList.item(i);
    if (!file) continue
    const fileDataUrl = await FileUtil.readFileAsDataURL(file)
    console.log(fileDataUrl);
    
    sendText.value = fileDataUrl
  }
}

function sendToAll(sendText: string | ArrayBuffer | null) {
  userRef.value.sendToAll(sendText)
}

function chatLog(content: string) {
  chatContent.value += content
}

</script>

<template>
  <User ref="userRef" @chat-log="chatLog" :style="'left:${};top:${};'"></User>

  <div class="side-menu">
    <input v-model="anotherName" />
    <button @click="connect(anotherName)">connect</button>
    <br>
    <input v-model="sendText" />
    <button @click="sendToAll(sendText)">send</button>
    <br>
    <input type="file" id="file-input" @change="selectFiles">
    <br>
    <textarea v-model="chatContent" style="width: 300px;height: 200px;"></textarea>
  </div>
</template>

<style scoped>
.side-menu {
  position: absolute;
  right: 0%;
  top: 0%;
  align-items: center;
}

.side-menu:only-child {

  margin: 10px
}
</style>
