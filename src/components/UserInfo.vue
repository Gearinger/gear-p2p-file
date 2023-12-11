<script setup lang="ts">

const prop = defineProps({
    position: {
        type: Array<Number>,
        default: [100, 10]
    }
})

</script>
<template>
    <div class="user-info" :style="`left:${position[0]}px;top:${position[1]}px;`">userinfo</div>
</template>
<style lang="less" scoped>
.user-info {
    position: absolute;
    top: 100px;
}
</style>

