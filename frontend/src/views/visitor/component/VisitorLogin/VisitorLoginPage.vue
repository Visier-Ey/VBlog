<template>
  <div
      class="logDialog"
      ref="logDialog"
  >
    <div class="MessageBox" ref="messageBox">{{ message }}</div>
    <div class="logDialogWrapper" ref="loginDialog">
      <div class="logDialogHeader">
        <h1>Login</h1>
      </div>
      <div class="logDialogBody">
        <form class="logDialogBodyForm" action="">
          <div class="form-control">
            <input type="text" required v-model="logInfo.account">
            <label for=""><span v-for="(char, index) in 'Account'.split('')"
                                :style="{ transitionDelay: index * 70 + 'ms' }">{{ char }}</span></label>
          </div>
          <div class="form-control">
            <input type="password" required v-model="logInfo.password">
            <label for=""><span v-for="(char, index) in 'Password'.split('')"
                                :style="{ transitionDelay: index * 70 + 'ms' }">{{ char }}</span></label>
          </div>
        </form>
      </div>
      <div class="logDialogFooter">
        <p class="text">Don't have an account? <a @click="jumpRegisterHandle" href="#">register</a></p>
        <el-button @click="cancelHandle">Cancel</el-button>
        <el-button @click="loginHandle">Login</el-button>
      </div>
    </div>
    <div class="logDialogWrapper hidden" ref="registerDialog">
      <div class="logDialogHeader">
        <h1>Register</h1>
      </div>
      <div class="logDialogBody">
        <form class="logDialogBodyForm" action="">
          <div class="form-control">
            <input type="text" required v-model="logInfo.account">
            <label for=""><span v-for="(char, index) in 'Account'.split('')"
                                :style="{ transitionDelay: index * 70 + 'ms' }">{{ char }}</span></label>
          </div>
          <div class="form-control">
            <input type="password" required v-model="logInfo.password">
            <label for=""><span v-for="(char, index) in 'Password'.split('')"
                                :style="{ transitionDelay: index * 70 + 'ms' }">{{ char }}</span></label>
          </div>
          <div class="form-control">
            <input type="password" required v-model="logInfo.verify">
            <label for=""><span v-for="(char, index) in 'Verify'.split('')"
                                :style="{ transitionDelay: index * 70 + 'ms' }">{{ char }}</span></label>
          </div>
        </form>
      </div>
      <div class="logDialogFooter">
        <el-button @click="cancelRegisterHandle">Cancel</el-button>
        <el-button @click="registerHandle">Register</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import {visitorApplication, visitorLogin} from "../../../../api/visitors";

const logDialog = ref<HTMLElement | null>(null);
const loginDialog = ref<HTMLElement | null>(null);
const registerDialog = ref<HTMLElement | null>(null);
const message = ref<string>('Message');
const messageBox = ref<HTMLElement | null>(null);


interface LogInfo {
  account: string;
  password: string;
  verify: string;
}

const logInfo = ref<LogInfo>({
  account: '',
  password: '',
  verify: '',
});

interface LogDialogProps {
  logVisible: boolean;
  isLog: boolean;
}

interface Props {
  logDialogProps: LogDialogProps;
}

const props = defineProps<Props>();

const messagePop = async (msg: string) => {
  message.value = msg;
  messageBox.value.classList.add('tip');
  setTimeout(() => {
    messageBox.value.classList.remove('tip');
  }, 3000);
};

watch(() => props.logDialogProps.logVisible, (newVal) => {
  if (newVal) {
    logDialog.value.classList.add('show');
  } else {
    logDialog.value.classList.remove('show');
  }
});
const cancelHandle = async () => {
  props.logDialogProps.logVisible = false;
};
const loginHandle = async () => {
  // not implemented
  if (logInfo.value.account === '' || logInfo.value.password === '') {
    await messagePop('Account or password is empty');
    return;
  }
  const res = await visitorLogin(logInfo.value.account, logInfo.value.password);
  if (res.data.status === 'success') {
    props.logDialogProps.isLog = true;
    localStorage.setItem('jwtToken', res.data.token);
    sessionStorage.setItem('isLog', 'true');
    localStorage.setItem('nick', res.data.data.nick);
    location.reload();
  }else {
    await messagePop(res.data.message);
  }
}


const jumpRegisterHandle = async () => {
  loginDialog.value.classList.add('hidden');
  registerDialog.value.classList.remove('hidden');
};

const cancelRegisterHandle =async () => {
  registerDialog.value.classList.add('hidden');
  loginDialog.value.classList.remove('hidden');
};

const registerHandle =async () => {
  if (logInfo.value.account === '' || logInfo.value.password === '' || logInfo.value.verify === '') {
    await messagePop('No empty!');
    return;
  }
  if (logInfo.value.password !== logInfo.value.verify) {
    await messagePop('Password is not the same');
    return;
  }
  visitorApplication(logInfo.value.account, logInfo.value.password).then((res) => {
    messagePop(res.data.message);
  });
};
</script>
<!--messagebox-->
<style scoped>
.MessageBox {
  position: absolute;
  top: 100px;
  right: 100%;
  width: 800px;
  height: 100px;
  background: none;
  font-size: 40px;
  color: #00ffd8;
  transform: skewX(-30deg);
  transition: all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  border: 2px solid #00ffd8;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
}

.MessageBox.tip {
  color: #00ffd8;
  border: 2px solid #00ffd8;
  right: 1100px;
  opacity: 1;
}
</style>
<!--loginDialogWrapper-->
<style scoped>
.logDialog {
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  width: 112vw;
  height: 100vh;
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  top: 0;
  right: 0;
  opacity: 0;
  transition: all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  transform: translateX(-100%);
}

.logDialog.show {
  transform: translateX(0);
  opacity: 1;
}

.logDialogWrapper {
  position: absolute;
  width: 800px;
  height: 500px;
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: #00ffd8 1px solid;
  border-bottom: #00ffd8 1px solid;
  overflow-y: hidden;
  transition: all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.logDialogWrapper.hidden {
  height: 0;
  opacity: 0;
  z-index: -50;
}

.logDialogBody {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logDialogBodyForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  top: -20px;
}

.logDialogFooter {
  position: relative;
  width: 100%;

  .el-button {
    width: 220px;
    height: 40px;
    transform: skewX(-20deg);
    font-size: 30px;
    background: none;
    color: #00ffd8;
    border-radius: 0;
    border: none;
    border-left: #00ffd8 2px solid;
    border-right: #00ffd8 2px solid;

    &:hover {
      background: #00ffd8;
      color: black;
    }
  }
}
</style>
<!--detail something-->
<style scoped>
h1 {
  font-size: 80px;
  text-align: center;
  margin-bottom: 30px;
  color: rgba(86, 253, 223, 0.95);
  transform: skewx(-15deg);
}

.form-control {
  width: 80%;
  margin-bottom: 40px;
}

.form-control input {
  background: transparent;
  border: none;
  border-bottom: 1px solid gray;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 25px;
  color: aqua;
  position: relative;

  &:focus {
    border-color: aqua;
  }
}

p {
  margin-top: 20px;
  color: aqua;
  position: absolute;
  bottom: 70px;
  right: 0;

  a {
    color: rgb(255, 0, 174);
    text-decoration: none;
  }
}

.form-control input:focus, .form-control input:valid {
  outline: none;
  border-bottom-color: aqua;
}

.form-control label {
  position: absolute;
  top: 15px;
  left: 20px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 25px;
  min-width: 5px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.form-control input:focus + label, .form-control input:valid + label {
  top: -15px;
}

.form-control {
  position: relative;
  margin-bottom: 30px;
}

.form-control input:focus + label span, .form-control input:valid + label span {
  color: aqua;
  transform: translateY(-15px) skewX(-15deg);
  font-size: 30px;
}
</style>