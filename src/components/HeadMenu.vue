<script setup lang="ts">
import { ref } from 'vue';


const emit = defineEmits<{
    connect: [name: string | undefined]
}>()

const name = ref<string>()
const message = ref<string>()

function about() {
    window.open("")
}

</script>
<template>
    <div class="head-menu">
        <input class="head-menu-input" type="text" placeholder="输入连接的对象……" v-model="name"  @keydown.enter="$emit('connect', name)">
        <button class="head-menu-button head-menu-connect" @click="$emit('connect', name)">连接</button>
        <button class="head-menu-button head-menu-about" @click="about">关于</button>
    </div>
</template>
<style lang="less" scoped>
.head-menu {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: end;
    align-items: center;
}

.head-menu-button {
    margin-right: 2rem;
    border-color: rgba(200, 100, 100, 1.0);
    padding: 5px 20px;
    height: 2rem;
    border-radius: 5px;
}

.head-menu-connect {
    justify-self: center;
    border-radius: 0 5px 5px 0px;
}



.head-menu-input {
    height: 1.6rem;
    margin-right: 0rem;
    border-radius: 5px 0 0px 5px;
}
</style>

