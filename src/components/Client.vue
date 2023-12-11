<script setup lang="ts">
import { computed, ref } from "vue";
import RingMenu from "./RingMenu.vue"
import { UserModel } from "../model/UserModel"


const prop = defineProps({
    user: Object as () => UserModel
})

defineEmits(['onClick', "onClose"])

const isWaitConnect = computed(() => prop.user?.isWaitConnect)
const isOnline = computed(() => prop.user?.isOnline)

</script>

<template>
    <div :class="{ 'client': true, 'isWaitConnect': isWaitConnect, 'isOnline': isOnline }" @click="$emit('onClick')">
        <div class="letter">
            {{ user?.name[0] }}
        </div>
        <div class="user-name">
            {{ user?.name }}
        </div>
        <div class="client-close" @click="$emit('onClose')">x</div>
    </div>
</template>

<style lang="less">
.client {
    position: relative;
    width: 100px;
    display: flex;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
    color: rgba(100, 100, 100, 1);
}

.isWaitConnect {
    position: relative;
    width: 100px;
    display: flex;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
    color: rgba(255, 100, 100, 1);
}

.isOnline {
    position: relative;
    width: 100px;
    display: flex;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
    color: rgba(255, 255, 100, 1);
}

.client:hover {
    opacity: 1;
    color: rgba(255, 255, 100, 1);
}

.client .letter {
    z-index: 2;
    font-size: 50px;
    line-height: 80px;
    user-select: none;
    border-radius: 100%;
    background-color: rgb(12, 12, 15);
    border-radius: 100%;
    height: 80px;
    width: 80px;
}

.client .letter:hover {
    box-shadow: 0 0 50px 0px rgba(255, 255, 100, 0.3);
}

.client .user-name {
    position: absolute;
    top: 100px;
    text-align: center;
    border-color: transparent;
    background-color: transparent;
    transition: border-color 1s;
    border-radius: 5px;
    border-style: groove;
    padding: 5px;
    color: aliceblue;
}

.client-close {
    position: absolute;
    z-index: 99;
    color: aliceblue;
    right: 0px;
    top: 0px;
}
</style>