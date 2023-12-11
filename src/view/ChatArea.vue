<script setup lang="ts">
import ChatHistory from '../components/ChatRecord.vue';
import TextSend from '../components/TextSend.vue';
import Logo from "../components/Logo.vue"
import { ref } from "vue"
import { globalStore } from "../store"
import { SendContentModel } from "../model/SendContentModel"

const chatHistoryRef = ref<any>()
const textSend = ref<any>()
const mainUser = globalStore().mainUser

const emit = defineEmits(["sendTextEvent"])

function sendText(text: string) {
    // chatHistoryRef.value.recordText(mainUser, text)
    emit("sendTextEvent", text)
    textSend.value.clearText()
}

function recordContent(content: SendContentModel) {
    chatHistoryRef.value.recordContent(content)
}

defineExpose({ recordContent })

</script>
<template>
    <div class="chat-area">
        <Logo></Logo>
        <ChatHistory ref="chatHistoryRef"></ChatHistory>
        <TextSend ref="textSend" @sendText="sendText"></TextSend>
    </div>
</template>
<style lang="less">
.chat-area {
    width: 25%;
    height: 100%;
    background-color: rgba(100, 100, 100, 1.0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
</style>

