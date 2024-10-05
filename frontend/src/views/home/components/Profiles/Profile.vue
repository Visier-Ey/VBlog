<template>
  <div class="profile-container">
    <Avatar
        :url="AvatarUrl"
    />
    <div class="textArea">
      <span class="name">{{ user }}</span>
      <span class="brief">{{ brief }}</span>
    </div>
  </div>
</template>

<script setup>
import Avatar from "./Avatar.vue";
import {onBeforeMount, reactive, ref} from "vue";
import {getUser} from '../../../../api/users.js';

const user = ref('');
const brief =ref("Ah! I guess I have to write something here," +
    "in fact, I don't know what to write, so I just write something here."+
    "Let me tell you a story..."+
    "several years ago,I have said some lover talk to my friend."+
    "I said 'xiao xiao' to her,and she confused with my call,"+
    "yes,her name is 'xiao xiao',too."+
    "I said,'nothing ,I just want you to xiao xiao.'"+
    "I mean I want you to be happy."+
    "I hope you like it.");
const AvatarUrl = ref({
  frameUrl: '',
  avatarUrl: ''
});

onBeforeMount(() => {
  getUser().then(res => {
    user.value = res.data[0].name;
    brief.value = res.data[0].brief;
    AvatarUrl.value = {
      frameUrl: res.data[0].frameUrl,
      avatarUrl: res.data[0].avatarUrl
    };
    localStorage.setItem('user', user.value);
  });
});
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 80%;
  width: 80%;
}

.textArea {
  max-width: 70%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 40px;
  color: black;

  .name {
    font-size: 54px;
    font-weight: bold;
    font-family: "Times New Roman";
  }

  .brief {
    font-size: 20px;
    text-align: left;
  }
}
</style>