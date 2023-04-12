<script setup lang="ts" modules>
import { onMounted, ref } from "vue"
import { DataConnection, Peer } from "peerjs";

const emit = defineEmits(['login'])

const peer = ref<Peer>()
const myName = ref<string>()
const connectionList = ref<DataConnection[]>([])

onMounted(() => {
    login()
    emit("login", myName.value)
})

// 登录，等待连接
function login() {
    peer.value = new Peer("Tom");
    // peer.value = new Peer();

    console.log(`[${myName.value}] 已初始化`);

    // 等待被连接
    peer.value.on('connection', conn => {
        console.log(`[${myName.value}] 被连接`);
        myName.value = peer.value?.id
        connectionList.value.push(conn)

        // 接受消息
        conn.on('data', data => {
            console.log(`从[${conn.peer}]接收到消息`);
            console.log(data);
        });
    });
}

const connect = ref((anotherName: string) => {
    console.log(peer.value);
    
    peer.value?.on('open', id => {
        console.log('Peer ID:', id);

        console.log(`[${myName.value}] 请求连接 [${anotherName}]`);

        const conn = peer.value?.connect(anotherName);

        conn?.on('open', () => {
            console.log(`[${myName.value}] 连接 [${anotherName}] 成功！`);
            conn.send(`Hello, MyName is ${myName.value}`);
        });

        conn?.peerConnection

        conn?.close()
    });
})

const sendText = ref((text: string) => {
    for (const conn of connectionList.value) {
        conn.send(text);
    }
})

defineExpose({ connect, sendText })
</script>

<template>
    <div class="avatar">
        <button class="avatar-btn">test</button>
        <div class="avatar-ring" style="scale: 1;">
            <div class="avatar-ring" style="scale: 1;"></div>

        </div>
    </div>
</template>

<style lang="css">
.avatar {
    position: absolute;
    text-align: left;
}

.avatar-btn {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 100%;
}

.avatar-ring {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    height: 76px;
    border-style: solid;
    border-radius: 100%;
    transition: border-color 2s;
    cursor: pointer;
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 3px;
}

.avatar-ring:hover {
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.1);
    animation-name: ripple;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

@keyframes ripple {
    to {
        opacity: 0;
        transform: scale(2);
    }
}
</style>
