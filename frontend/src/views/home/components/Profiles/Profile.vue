<template>
  <div class="profile-container">
    <Avatar
        :url="{avatarUrl: props.profile.avatarUrl, frameUrl: props.profile.frameUrl}"
    />
    <div class="textArea">
      <span class="name">{{ props.profile.name }}</span>
      <div class="AdditionalInfo">
        <div class="age">Year:{{ props.profile.age }}</div>
        <div class="works">Work:{{ props.profile.work || '' }}</div>
        <div class="school">{{ props.profile.school || '' }}</div>
      </div>
      <span class="brief">{{ props.profile.brief }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from "./Avatar.vue";
import {ref} from "vue";

const user = ref('');
const brief = ref("Ah! I guess I have to write something here," +
    "in fact, I don't know what to write, so I just write something here." +
    "Let me tell you a story..." +
    "several years ago,I have said some lover talk to my friend." +
    "I said 'xiao xiao' to her,and she confused with my call," +
    "yes,her name is 'xiao xiao',too." +
    "I said,'nothing ,I just want you to xiao xiao.'" +
    "I mean I want you to be happy." +
    "I hope you like it.");

interface Profile {
  name: string;
  brief: string;
  age: number;
  work?: string;
  school?: string;
  frameUrl?: string;
  avatarUrl?: string;
}

interface Props {
  profile: Profile;
}

const props = defineProps<Props>();
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
  .AdditionalInfo{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 10px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.8);
    & *{
      margin-left: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>