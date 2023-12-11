<script setup lang="ts">
import { ref } from 'vue';
import {SendContentModel} from "../model/SendContentModel"

defineEmits(["sendText"])

function clearText() {
    text.value = undefined
}

const text = ref<string>()

defineExpose({clearText})

</script>
<template>
    <div class="text-send">
        <input class="text-send-input" type="text" placeholder="输入聊天内容……" v-model="text" @keydown.enter="$emit('sendText', text)">
        <button class="text-send-button" @click="$emit('sendText', text)">发送</button>
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
}
</style>

