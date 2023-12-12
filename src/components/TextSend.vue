<script setup lang="ts">
import { ref } from 'vue';
import { SendContentModel } from "../model/SendContentModel"

const emit = defineEmits(["sendText", "sendFiles"])

function clearText() {
    text.value = undefined
}

const text = ref<string>()
// const selectFileHandles = ref<FileSystemFileHandle[]>()

function send() {
    if (text.value) {
        emit('sendText', text.value)
    }

    // if (selectFileHandles.value) {
    //     const selectFiles = selectFileHandles.value?.map(p=>p.getFile())
    //     console.log(selectFiles);
    //     emit('sendFiles', selectFiles)
    // }
}

function selectFileEvent() {
    document.getElementById("selectFiles")?.click()
}

defineExpose({ clearText })

</script>
<template>
    <div class="text-send">
        <input class="text-send-input" type="text" placeholder="输入聊天内容……" v-model="text"
            @keydown.enter="$emit('sendText', text)">
        <!-- <input id="selectFiles" type="file" multiple :value="selectFileHandles" style="width: 0rem;opacity: 0;">
        <button class="text-send-button" @click="selectFileEvent">文件</button> -->
        <button class="text-send-button" @click="send">发送</button>
    </div>
</template>
<style lang="less" scoped>
.text-send {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
}

.text-send-input {
    width: 100%;
    height: 24px;
    font-size: 0.6rem;
}

.text-send-button {
    font-size: 0.6rem;
    padding: 2px 10px;
    height: 30px;
    width: 3rem;
    border-radius: 0%;
    border-color: rgb(150, 100, 100);
    white-space: nowrap;
}
</style>

