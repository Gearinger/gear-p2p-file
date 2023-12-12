<script setup lang="ts">
import { ref, useSSRContext } from 'vue';
import { globalStore } from "../store"
import { UserModel } from "../model/UserModel"
import { SendContentModel } from "../model/SendContentModel"
import FileSaver from 'file-saver';


const chatHistoryText = ref("")
const mainUser = globalStore().mainUser
const arrayBufferPool = new Map()

function updatePercent(text: string, newPercent: string) {
    let lastPercentIndex = text.lastIndexOf('%');
    let beforePercent = text.substring(0, lastPercentIndex);
    let lastNumberIndex = beforePercent.lastIndexOf('-');
    let newText = text.substring(0, lastNumberIndex + 1) + newPercent + "%" + text.substring(lastPercentIndex + 1);
    return newText
}

function recordContent(content: SendContentModel) {
    if (content.type == "text") {
        chatHistoryText.value += content.sendUserName + "：" + content.textContent + "\n";
    }
    if (content.type == "file") {
        const currentSlice = content.sliceNode?.split("_")[0]
        const transferPercent = Number(currentSlice == "end" ? content.totalSliceCount : currentSlice) / Number(content.totalSliceCount ?? 1) * 100
        if (chatHistoryText.value.includes(`${content.sendUserName}：${content.fileName}`)) {
            chatHistoryText.value = updatePercent(chatHistoryText.value, transferPercent.toFixed(2))
        } else {
            chatHistoryText.value += `${content.sendUserName}：${content.fileName}-${transferPercent.toFixed(2)}%\n`;
        }
        if (content.sendUserName != mainUser.name) {
            arrayBufferPool.set(content.sliceNode, content.byteContent)
            if (content.sliceNode?.startsWith("end")) {
                const hashCode = content.sliceNode.split("_")[1]

                let totalArrayBuffer: ArrayBuffer[] = []
                for (const [key, arrayBuffer] of arrayBufferPool) {
                    if (key.endsWith(hashCode)) {
                        totalArrayBuffer = totalArrayBuffer.concat(arrayBuffer)
                        arrayBufferPool.delete(key)
                    }
                }
                const blob = new Blob(totalArrayBuffer);
                FileSaver.saveAs(blob, content.fileName)
            }

        }
    }
}

defineExpose({ recordContent })

</script>
<template>
    <textarea class="chat-history" disabled v-model="chatHistoryText"></textarea>
</template>
<style lang="less" scoped>
.chat-history {
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    border-width: 0rem;
    resize: none;
    padding: 10px;
}
</style>

