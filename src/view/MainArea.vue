<script setup lang="ts">
import { ref } from "vue";
import User from "../components/User.vue";
import Client from "../components/Client.vue";
import { globalStore } from "../store"
import { UserModel } from "../model/UserModel"
import HeadMenu from "../components/HeadMenu.vue";
import { SendContentModel } from "../model/SendContentModel"

const otherUserList = globalStore().otherUserList
const mainUser = globalStore().mainUser

const userRef = ref<any>(null)
const anotherName = ref<string>("Tom")

const emit = defineEmits(["recordContent"])

function connect(name: string | undefined) {
    if (!name) {
        alert("请输入连接对象的名称！");
    }
    userRef.value.connect(name)
}

function sendTextToAll(sendText: string) {
    const content: SendContentModel = {
        type: "text",
        sendUserName: mainUser.name,
        textContent: sendText,
    }
    userRef.value.sendToAll(content)
}

function sendFileToAll(sendFile: ArrayBuffer, fileName: string, sliceNode: string, totalSliceCount: Number) {
    const content: SendContentModel = {
        type: "file",
        sendUserName: mainUser.name,
        fileName: fileName,
        fileExt: fileName.split('.')[1],
        byteContent: sendFile,
        sliceNode: sliceNode,
        totalSliceCount: totalSliceCount
    }
    userRef.value.sendToAll(content)
}

function recordContent(content: SendContentModel) {
    emit("recordContent", content)
}

function removeClient(user: UserModel) {
    otherUserList.forEach((u, index, arr) => {
        if (u.name == user.name) {
            arr.splice(index, 1);
        }
    });
}

async function selectAndSendFile() {
    const fileHandles = await window.showOpenFilePicker();
    console.log(fileHandles);

    for (const fileHandle of fileHandles) {
        let start = 0;
        let count = 0;
        let chunkSize = 1024 * 1024;
        const file: File = await fileHandle.getFile();
        const hashCode = new Date().getTime()
        let sliceNode = ""
        const totalSliceCount = Math.floor(file.size / chunkSize) + 1
        while (start < file.size) {
            let end = start + chunkSize
            sliceNode = count + "_" + hashCode
            if (start + chunkSize > file.size) {
                sliceNode = "end_" + hashCode
                end = file.size
            }

            const blob = file.slice(start, end)
            const arrayBuffer = await blob.arrayBuffer()
            sendFileToAll(arrayBuffer, fileHandle.name, sliceNode, totalSliceCount)
            start += chunkSize
            count++
        }
    }
}

defineExpose({ sendTextToAll })
</script>
<template>
    <div class="main-body">
        <HeadMenu @connect="connect"></HeadMenu>

        <div class="other-users">
            <div v-for="user in otherUserList">
                <Client :user="user" @onClose="removeClient(user)" @on-click="selectAndSendFile"></Client>
            </div>
        </div>

        <User ref="userRef" @record-content="recordContent"></User>

    </div>
</template>
<style lang="less">
.main-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.other-users {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    min-height: 100px;
}
</style>
