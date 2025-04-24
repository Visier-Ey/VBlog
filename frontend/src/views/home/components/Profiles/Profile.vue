<template>
  <div class="profile-container">
    <!--  DECORATE HERE  -->
    <div class="decorate">
      <div class="scanLine"></div>
    </div>
    <!--  Name Here  -->
    <span class="name">{{ props.profile.nick.toUpperCase() }}</span>
    <span class="WebsiteName">{{ "浮生百态" }}</span>
    <!--  textArea Here  -->
    <div class="textArea">
      <div class="AdditionalInfo">
        <div class="niceToMeetYou">Hello! Nice to see you 😀</div>
        <div class="selfName">我是<span>{{ props.profile.name.toUpperCase() }}</span></div>
        <div class="brief">今年{{props.profile.age}}纯情男大一个😚</div>
        <div class="supply">平常喜欢...(hover it)
          <div class="hidden">喜欢你😘</div>
        </div>
        <!--        <div class="works">Work:{{ props.profile.work || '' }}</div>-->
      </div>
      <div class="character">
        <span class="words">Character:</span>
        <div class="brief">
          <span v-for="(char, index) in props.profile.brief.split('')"
                class="words"
                :style="{ animationDelay:  index * 70 + 'ms' }">{{ char }}</span>
        </div>
      </div>
    </div>

    <!-- ---------------------------------------------------------------------  -->

    <!--  frame here  -->
    <div class="frame">
      <!--  avatar here  -->
      <div class="avatar-box">
        <div class="layer bottom"></div>
        <div class="layer bottom-middle"></div>
        <div class="layer middle"></div>
        <div class="layer middle-top"></div>
        <div class="layer top">
          <Avatar
              :url="{avatarUrl: props.profile.avatarUrl, frameUrl: props.profile.frameUrl}"
          />
        </div>
      </div>
      <div class="frame-top"></div>
      <div class="frame-right"></div>
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
  nick?: string;
}

interface Props {
  profile: Profile;
}

const props = defineProps<Props>();
</script>

<style scoped>

.profile-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 100vh;
  margin: 0 50px;
  width: 95%;
  --layer-color: rgba(40, 255, 230, 0.2);
  backdrop-filter: blur(3px);
  contain: strict;

  .decorate {
    left: 0;
    top: 0;
    position: absolute;
    width: 13%;
    height: 100%;
    background: rgba(0, 255, 255, 0.7);
    overflow: hidden;
    .scanLine {
      filter: blur(5px);
      top: 0;
      right: 0;
      position: relative;
      width: 10px;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      transition: all 1s ease;
      animation: scan 10s ease infinite alternate;
      contain: strict;
    }
  }
}

@keyframes scan {
  0% {
    transform: translateX(50px) translateY(50%) rotate(240deg);
  }
  5% {
    transform: translateX(50px) translateY(50%) rotate(240deg);
  }
  95% {
    transform: translateX(0) translateY(-40%) rotate(45deg);
  }
  100% {
    transform: translateX(0) translateY(-40%) rotate(45deg);
  }
}

.name {
  color: black;
  position: absolute;
  top: 15px;
  font-size: 150px;
  font-weight: bold;
  font-family: "BaskOldFace";
  transform: skewX(-25deg);
}
.WebsiteName {
  z-index: 100;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 40px;
  right: -40px;
  font-size: 180px;
  font-weight: bold;
  font-family: ZQZMXS;
  writing-mode: vertical-rl;
}

.textArea {
  left: 5px;
  position: relative;
  top: 160px;
  max-width: 70%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 40px;
  color: black;
  z-index: 100;

  .brief {
    font-size: 20px;
    text-align: left;
  }

  .character {
    font-size: 20px;
    text-align: left;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.2);
    border: black solid 2px;
    min-height: 300px;
    max-width: 800px;
    padding: 30px;
    margin-top: 20px;
    color: white;
    overflow: hidden;
    span{
      display: inline;
    }
  }
  .AdditionalInfo {
    border: black solid 2px;
    border-radius: 50px;
    width: 500px;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 10px;
    font-size: 20px;
    color: white;
    background: rgba(0, 0, 0, 0.2);

    .selfName {
      text-align: left;
      width: 100%;
      position: relative;
      font-size: 50px;
      color: white;
      span{
        left: 100px;
        width: auto;
        position: absolute;
        color: white;
        transition: all 1s ease;
        &:hover {
          color: #00ffff;
          cursor: pointer;
          font-size: 60px;
          transition: all 0.3s ease;
        }
      }
    }

    .niceToMeetYou {
      top: 10px;
      font-size: 20px;
    }

    .supply {
      .hidden {
        position: relative;
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.2, 0.3, 0.2, 0.6);
        transform: translateY(-20px);
      }

      &:hover {
        cursor: pointer;

        .hidden {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    & * {
      position: relative;
      left: 30px;
      margin-left: 10px;
      margin-bottom: 10px;
    }
  }
}
.words {
  position: relative;
  display: inline-block;
  font-size: 30px;
  color: white;
  filter: blur(1px);
  animation: wordsJump 2s ease infinite;
  contain: strict;
}
@keyframes wordsJump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px) scale(1.1);
    filter: blur(0px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

<!-- avatar here -->
<style scoped>
.avatar-box {
  position: absolute;
  aspect-ratio: 1/1;
  width: 1000px;
  background: rgba(255, 255, 255, 0);
  right: -120px;
  top: -180px;
}

.layer {
  aspect-ratio: 1/1;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
  box-shadow: 1px 5px 15px rgba(0, 0, 0, 0.8);
}

.avatar-box {
  .bottom {
    width: 100%;
    height: 100%;
    animation: rotate 30s linear infinite;
    background: var(--layer-color);
  }

  .bottom-middle {
    width: 90%;
    top: 5%;
    left: 5%;
    animation: rotate 25s linear infinite reverse;
    background: var(--layer-color);
  }

  .middle {
    width: 80%;
    top: 10%;
    left: 10%;
    animation: rotate 20s linear infinite;
    background: var(--layer-color);
  }

  .middle-top {
    width: 50%;
    top: 25%;
    left: 25%;
    animation: rotate 15s linear infinite reverse;
    background: var(--layer-color);
  }

  .top {
    width: 30%;
    top: 35%;
    left: 35%;
    filter: blur(0);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.frame {
  position: absolute;
  right: -20px;
  top: 10px;
  width: 100%;
  min-height: 90vh;
  background: inherit;
  overflow: hidden;

  .frame-top {
    position: absolute;
    top: 0;
    right: 0;
    width: 90%;
    height: 20px;
    background: rgba(0, 0, 0, 0.5);
    transform: skewX(-45deg);
    transform-origin: top right;
    border-top: black 3px solid;
    border-right: white 2px solid;;
    border-bottom: white 1px solid;
    border-left: white 2px solid;
  }

  .frame-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 70%;
    background: rgba(0, 0, 0, 0.5);
    transform: skewY(-45deg);
    transform-origin: top right;
    border-right: black 3px solid;
    border-left: white 1px solid;
    border-bottom: white 1px solid;
  }
}
</style>