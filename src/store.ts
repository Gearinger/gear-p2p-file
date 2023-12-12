import { defineStore } from 'pinia'
import { toRefs, ref } from 'vue'
import { UserModel } from "./model/UserModel"

export const globalStore = defineStore("globalStore", () => {
    const otherUserList = ref<UserModel[]>([
        // {
        //     name: "test",
        //     isWaitConnect: false,
        //     isOnline: false
        // }
    ])
    const mainUser = ref<UserModel>({
        name: '',
        isWaitConnect: false,
        isOnline: false
    })

    const removeOtherUser = function (clientName: string) {
        otherUserList.value.forEach((u, index, arr) => {
            if (u.name == clientName) {
                arr.splice(index, 1);
            }
        });
    }

    return {
        otherUserList, mainUser, removeOtherUser
    }
})