<script setup lang="ts">
import { Ref, computed, ref } from 'vue';

const prop = defineProps(
    {
        isOpen: {
            default: false,
            type: Boolean
        },
        radius: Number,
        // models: Array as () => ButtonModel[],
    }
)

interface ButtonModel {
    name: string,
    clickHandle: Function,
}

const isOpen = computed(() => prop.isOpen)

const models = ref<ButtonModel[]>([
    {
        name: 'test', clickHandle: () => {
            console.log('test');
        }
    },
    {
        name: 'test2', clickHandle: () => {
            console.log('test');
        }
    },
    {
        name: 'test3', clickHandle: () => {
            console.log('test');
        }
    },
])

const radius = 10


</script>

<template>
    <div :class="{ 'ring-menu': true, 'open': isOpen }" :style="{ width: `${radius}px` }">
        <button v-for="btnModel, index in models" @click="btnModel.clickHandle">
            {{ btnModel.name }}
        </button>
        <slot></slot>
    </div>
</template>

<style scoped>
.ring-menu {
    position: absolute;
}

.ring-menu button {
    position: absolute;
    top: 20px;
    left: 20px;
    visibility: hidden;
}

.ring-menu.open button {
    visibility: visible;
}

.ring-menu.open button:nth-child(1) {
    background-color: red;
    transition: 0.5s;
    transform: translateY(-5rem)
}

.ring-menu.open button:nth-child(2) {
    background-color: yellow;
    transition: 0.5s;
    transform: translateX(5rem)
}

.ring-menu.open button:nth-child(3) {
    background-color: greenyellow;
    transition: 0.5s;
    transform: translateY(5rem)
}
</style>

