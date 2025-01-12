

<template>
  <div class="Nav-wrapper">
    <!--        set blogger name-->
    <div class="user">
      {{ props.nick.toUpperCase() || 'VISIER' }}
    </div>
    <div class="nav">
      <!--          you know, the nav options-->
      <div class="menu">
        <div class="link" data-custom-id="home">{{ zeroWidthEncrypt('HOME', 'visier homeless') }}</div>
        <div class="link" data-custom-id="recent" data-custom-amount="3" @click="pageJump">
          {{ zeroWidthEncrypt('RECENT', 'miss my xx') }}
        </div>
        <!--            <div class="link list" data-custom-id="arts" data-custom-amount="2">{{ encrypt('ARTS', 'visier') }}-->
        <!--              <div class="group">-->
        <!--                <div class="link" data-custom-id="blogs" @click="pageJump($event)">{{ encrypt('BLOGS', 'visier') }}-->
        <!--                </div>-->
        <!--                <div class="link" data-custom-id="poetry" @click="pageJump($event)">{{ encrypt('POETRY', 'visier') }}-->
        <!--                </div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--    Work List        -->
        <div class="link list" data-custom-id="Works" data-custom-amount="3">{{
            zeroWidthEncrypt('WORKS', 'damn!')
          }}
          <div class="group">
            <div class="link" data-custom-id="OpenGL" @click="pageJump">{{
                zeroWidthEncrypt('OpenGL', 'visier')
              }}
            </div>
            <div class="link" data-custom-id="JS" @click="pageJump">{{ zeroWidthEncrypt('JS', 'visier') }}</div>
          </div>
        </div>
        <!--      Other List        -->
        <div class="link list" data-custom-id="others" data-custom-amount="3">{{
            zeroWidthEncrypt('OTHERS', 'visier')
          }}
          <div class="group">
            <div class="link" data-custom-id="TimeTravel" @click="pageJump">
              {{ zeroWidthEncrypt('T-TRAVEL', 'visier') }}
            </div>
            <div class="link" data-custom-id="contact" @click="pageJump">
              {{ zeroWidthEncrypt('CONTACT', 'visier') }}
            </div>
            <div class="link" data-custom-id="about" @click="pageJump">{{ zeroWidthEncrypt('ABOUT', 'visier') }}
            </div>
          </div>
        </div>
      </div>
      <!--          setting,searching...-->
      <div class="tool"></div>
      <!--    nav end        -->
    </div>
    <SwitchBoll :scale="isScaled"></SwitchBoll>
  </div>
</template>

<script lang="ts" setup>
import {zeroWidthEncrypt} from "../../../component/encryp";
import router from "../../../router";
import SwitchBoll from "../../component/SwitchBoll.vue";
import {ref} from "vue";

const isScaled = ref(true);
// universal page jump function
const pageJump = async (e) => {
  // set the LeaveScale effect
  isScaled.value = false;
  // set the blur effect
  props.page?.classList.add('blurPage');
  setTimeout(() => {
    router.push({name: e.target.dataset.customId});
  }, 500);
}

interface Props {
  page?: HTMLElement | null;
  nick?: string;
}

const props = defineProps<Props>();


</script>

<style scoped>
.Nav-wrapper {
  margin: 0;
  width: 100%;
  color: white;
  height: 60px;
  position: relative;

  .user {
    font-family: "Baskerville Old Face";
    position: absolute;
    left: 5%;
    padding: 0 10px;
    font-weight: 70;
    font-size: 70px;
    top: 0;
    transform: skewX(-20deg);
    z-index: 2001;
  }
}

.nav {
  width: 40%;
  margin: 0;
  height: 100%;
  z-index: 2001;
  position: absolute;
  right: 0;
}

.menu {
  height: 100%;
  flex: 2;
  margin: 0;
  display: flex;
  align-items: center;

  .list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;

    &:hover .group {
      opacity: 1;
    }

    &:hover[data-custom-amount="3"] .group {
      height: 150px;
    }

    &:hover[data-custom-amount="2"] .group {
      height: 100px;
    }

    &[data-custom-amount="3"] .link {
      height: 33%;
    }

    &[data-custom-amount="2"] .link {
      height: 50%;
    }

    .group {
      transition: all 0.3s ease;
      position: absolute;
      top: 55px;
      margin: 0;
      overflow-y: hidden;
      height: 0;
      opacity: 1;

      .link:hover {
        cursor: pointer;
        transform: skewX(-10deg);
      }
    }
  }

  .link {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    color: white;
    margin: 0;
    padding: 0 10px;
    transition: all 0.3s ease;
    font-family: "Berlin Sans FB Demi";
    font-size: 25px;
    background: inherit;

    &:hover {
      background-color: rgba(69, 69, 69, 0.5);
      cursor: pointer;
    }
  }

}

button {
  margin: 0;

}

.tool {
  margin: 0;
  flex: 1;
}
</style>