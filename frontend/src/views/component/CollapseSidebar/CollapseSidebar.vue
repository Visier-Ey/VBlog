<template>
  <div>
    <VisitorLoginPage
    :logDialogProps="logDialogProps"
    ></VisitorLoginPage>
    <div class="SidebarArea" ref="sidebarAreaDOM">
      <div class="SidebarRotateCollapse">
        <div class="Sidebar">
          <div class="visitorProfile">
            <div class="visitorProfileHeader">
              <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <span>visitor</span>
            </div>
            <div class="visitorProfileBody">
              <div class="visitorProfileNav">
                <el-button v-if="logDialogProps.isLog">Your Profile</el-button>
                <el-button v-if="logDialogProps.isLog">Your Comments</el-button>
                <el-button @click="logButtonHandle">{{ logDialogProps.isLog ? 'Logout' : 'Login' }}</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import VisitorLoginPage from "./VisitorLoginPage.vue";
const sidebarAreaDOM = ref<HTMLDivElement | null>(null);

const logDialogProps = ref({
  logVisible: ref(false),
  isLog: ref(sessionStorage.getItem('isLog') === 'true'),
});
const logButtonHandle = () => {
  if (logDialogProps.value.isLog) {
    logDialogProps.value.isLog = false;
    sessionStorage.setItem('isLog', 'false');
    localStorage.removeItem('jwtToken');
  } else {
    logDialogProps.value.logVisible = true;
  }
};

onMounted(() => {
  // split the label and flowed it when the input focused

  if (sidebarAreaDOM.value) {
    sidebarAreaDOM.value.addEventListener('mouseenter', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
</script>

<style scoped>
.SidebarArea {
  z-index: 900;
  margin: 0;
  width: 100px;
  height: 100vh;
  background: inherit;
  position: fixed;
  left: 0;
  top: 0;
}

.SidebarRotateCollapse {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100%;
  background: inherit;
  position: relative;
  transition: all 0.5s ease;
  overflow-x: hidden;
  border-right: solid 1px rgba(2, 234, 255, 0.8);
  border-top: solid 1px rgba(2, 234, 255, 0.8);
  transform-style: preserve-3d;
  transform-origin: 0 0 0;
  transform: rotateY(80deg) skewY(20deg) translateY(100px) translateX(100px);
  opacity: 0;

  &:hover {
    opacity: 1;
    transform: rotateY(10deg) skewY(8deg) translateY(-5px);
  }
}

.Sidebar {
  width: 100%;
  height: 90%;
  background: rgba(0, 0, 0, 0.1);
  position: relative;
  left: 0;
  top: 0;
  color: white;
  font-size: 60px;

  pre {
    margin-top: 100px;
    font-size: 25px;
    text-align: left;
  }
}

.SidebarArea:hover {
  .SidebarRotateCollapse {
    opacity: 1;
    transform: rotateY(10deg) skewY(8deg) translateY(-5px);
  }
}
</style>

<style scoped>
.visitorProfile {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
}

.visitorProfileHeader {
  height: auto;
  padding: 10px;
  text-align: center;
  background: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-avatar {
    width: 150px;
    height: 150px;
    border: 2px solid #05ffe5;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.05);
    }
  }

  span {
    font-size: 40px;
  }
}

.visitorProfileBody {
  position: relative;
  height: auto;
  width: 100%;
  background: inherit;
  bottom: 200px;

  .visitorProfileNav {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;

    .el-button {
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 1%;
        height: 100%;
        background-color: #00ffd8;
        opacity: 0;
        transition: all 0.5s ease;
      }

      background: inherit;
      margin: 0;
      box-sizing: border-box;
      position: relative;
      display: flex;
      justify-content: flex-start;
      transition: all 0.5s ease;
      width: 100%;
      height: 100px;
      font-size: 30px;
      border: none;
      border-bottom: solid 1px #05ffe5;

      &:hover {
        &:before {
          opacity: 1;
        }
      }
    }
  }
}
</style>

