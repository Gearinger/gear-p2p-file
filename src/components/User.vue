<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { globalStore } from "../store"
import { DataConnection, Peer } from "peerjs";
import PeerUtil from "../util/PeerUtil";
import { randomName } from "../util/NameUtil"
import UserInfo from "./UserInfo.vue";
import { SendContentModel } from "../model/SendContentModel"

const prop = defineProps({
    name: String
})

const store = globalStore();
const otherUserList = store.otherUserList
const mainUser = store.mainUser
const removeOtherUser = store.removeOtherUser

const myName = ref<string>(prop.name ? prop.name : randomName())
const peer = ref<Peer>()
const connectionList = ref<DataConnection[]>([])
const logined = ref(false)

const emit = defineEmits(['recordContent', "avatarClick"])


onMounted(() => {
    login()
})

async function login() {
    if (connectionList.value.length > 0) {
        connectionList.value.forEach(p => {
            p.close()
        })
    }
    connectionList.value = []

    peer.value = await PeerUtil.connectToPeerJS(myName.value)
    logined.value = true
    console.log(`[${myName.value}] 已初始化`);
    mainUser.name = myName.value
    mainUser.isOnline = true
    mainUser.isWaitConnect = false

    // 等待被连接
    peer.value.on('connection', conn => {
        console.log(`[${myName.value}] 被连接`);

        otherUserList.push({
            name: conn.peer,
            isWaitConnect: false,
            isOnline: true
        })
        connectionList.value.push(conn)

        // 接受消息
        conn.on('data', data => {
            console.log(`从[${conn.peer}]接收到消息：`);
            recordContent(data as SendContentModel)
        });

        conn.on('close', () => {
            console.log('Connection closed!');
            removeOtherUser(conn.peer)
        });

    });

}

function logout() {
    console.log('logout');

    connectionList.value.forEach(
        c => {
            c.close()
        }
    )

    logined.value = false
}

async function connect(peerId: string) {
    console.log("peer活跃状态：" + peer.value?.open);

    console.log(`[${peer.value?.id}] 请求连接 [${peerId}]`);

    if (connectionList.value.find(p => p?.peer == peerId)) {
        alert("已存在该连接！请勿重复连接！")
        return
    }

    if (!peer.value) {
        return
    }

    // 先将被连接用户添加到界面，如果连不上，置为离线状态
    otherUserList.push({
        name: peerId,
        isWaitConnect: true,
        isOnline: false
    })

    try {
        const conn = await PeerUtil.connectToPeer(peer.value, peerId)
        console.log(`[${myName.value}] 连接 [${peerId}] 成功！`);
        otherUserList.filter(p => p.name == peerId).forEach(p => { p.isWaitConnect = false; p.isOnline = true })
        connectionList.value.push(conn)
        send(conn.peer, {
            type: "text",
            sendUserName: myName.value,
            textContent: `Hello, MyName is ${myName.value}`,
        })

        // 接受消息
        conn.on('data', data => {
            console.log(`从[${conn.peer}]接收到消息：`);
            recordContent(data as SendContentModel)
        });
        conn.on('close', () => {
            console.log('Connection closed!');
            removeOtherUser(peerId)
        });
    } catch (error) {
        otherUserList.filter(p => p.name == peerId).forEach(p => { p.isWaitConnect = false, p.isOnline = false })
    }


}

function send(peerId: string, content: SendContentModel) {
    const tempConn = connectionList.value.find(p => p.peer == peerId)
    if (!tempConn) return
    console.log(`给${tempConn.peer}发送消息：${content}`);
    tempConn.send(content);
    recordContent(content)
}

const sendToAll = (content: SendContentModel) => {
    for (const conn of connectionList.value) {
        console.log(`给${conn.peer}发送消息：${content}`);
        conn.send(content);
    }
    recordContent(content)
}

function recordContent(content: SendContentModel) {
    emit('recordContent', content)
}

const userInfoVisiable = ref(false)
const userInfoPos = ref<[number, number]>([0, 0])
function showUserInfo(e: MouseEvent) {
    userInfoPos.value = [e.clientX, e.clientY]
    userInfoVisiable.value = true
}

defineExpose({ send, sendToAll, connect })

</script>

<template>
    <div class="user" :class="{ active: logined }" @mouseover="showUserInfo" @mouseleave="userInfoVisiable = false">
        <div class="letter" :class="{ active: logined }">
            {{ myName[0] }}
        </div>
        <div class="user-ring" :class="{ active: logined }" style="scale: 1;">
            <div class="user-ring" :class="{ active: logined }" style="scale: 1;"></div>
        </div>
        <input class="user-name" v-model="myName" @change="login" />
    </div>
    <UserInfo :position="userInfoPos" :info="mainUser" v-if="userInfoVisiable"></UserInfo>
</template>

<style lang="less">
.user {
    width: 10rem;
    height: 13rem;
    max-height: 15rem;
    position: relative;
    display: flex;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
}

.user.active {
    opacity: 1;
    color: rgba(100, 255, 255, 1);
}

@keyframes colorshrink {
    0% {
        color: rgba(100, 255, 255, 1);
        border-color: rgba(100, 255, 255, 0.1);
    }

    10% {
        color: rgba(100, 255, 255, 1);
        border-color: rgba(100, 255, 255, 1);
    }

    95% {
        color: rgba(100, 255, 255, 0.3);
        border-color: rgba(100, 255, 255, 0.1);
    }

    100% {
        color: rgba(100, 255, 255, 1);
        border-color: rgba(100, 255, 255, 1);
    }
}

.user:hover {
    opacity: 0.8;
}

.letter {
    z-index: 2;
    position: absolute;
    font-size: 50px;
    line-height: 80px;
    text-align: center;
    user-select: none;
    border-radius: 100%;
    background-color: rgb(12, 12, 15);
    border-radius: 100%;
    height: 80px;
    width: 80px;
}

.letter.active {
    animation-name: colorshrink;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

.user-ring.active {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-style: solid;
    border-radius: 100%;
    transition: border-color 2s;
    border-color: rgba(200, 255, 255, 0.2);

    box-shadow: 0px 0px 5px rgba(200, 255, 255, 0.1);
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

.user-name {
    position: absolute;
    top: 100px;
    text-align: center;
    border-color: transparent;
    background-color: transparent;
    transition: border-color 1s;
    border-radius: 5px;
    border-style: groove;
    box-shadow: none;
    padding: 5px;
    color: aliceblue;
}

.user-name:hover {
    border-color: rgba(200, 255, 255, 0.2);
    box-shadow: 0px 0px 3px rgba(200, 255, 255, 0.2);
}
</style>