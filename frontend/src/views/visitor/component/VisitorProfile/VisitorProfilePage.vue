<template>
  <div class="VisitorProfilePage">
    <div class="VisitorProfileCard" ref="visitorProfileCard">
      <div class="VisitorProfileLabel">
        <el-icon @click="backHome"><CloseBold /></el-icon>
        <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </div>
      <div class="VisitorProfileContent">
        <div class="Info">
          <span class="NickName">Visitor</span>
          <form ref="submitForm">

            <div class="form-control">
              <label for="" @click="labelClick">{{nick}}</label> <input type="text" v-model="form.nick"
                                                                       placeholder="Nick">
            </div>
            <div class="form-control">
              <label for="" @click="labelClick">Password</label> <input type="password" v-model="form.password"
                                                                        placeholder="Password">
            </div>
            <el-button @click="submitHandle">ReviseSubmit?</el-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {CloseBold} from "@element-plus/icons-vue";
import {updateVisitorProfile} from "../../../../api/visitors";
import {useRouter} from "vue-router";
const nick = ref('');
const router = useRouter();
interface Form {
  nick: string;
  password: string;
}

const form = ref<Form>({
  nick: '',
  password: '',
});
const visitorProfileCard = ref<HTMLDivElement | null>(null);
const submitForm = ref<HTMLFormElement | null>(null);
// show the input when the label clicked
const labelClick = async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  target.classList.add('labelShow');
  target.textContent = '';
  const input = target.nextElementSibling as HTMLElement;
  setTimeout(() => {
    input.classList.add('inputShow');
    input.style.width = '400px';
  }, 100);
};
// submit the form
const submitHandle = async () => {
  form.value.password = form.value.password.trim();
  if (!form.value.nick) {
    form.value.nick = localStorage.getItem('nick') as string;
  }
  // await updateVisitorProfile(form.value);
  submitForm.value?.submit();
};
const backHome = () => {
  router.push('/');
};
onMounted(async () => {
  nick.value = localStorage.getItem('nick') as string;
  setTimeout(() => {
    visitorProfileCard.value?.classList.add('enter');
  }, 100);
});
</script>

<style scoped>
.VisitorProfilePage {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}

.VisitorProfileCard {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  background: #ffffff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);

  .VisitorProfileLabel {
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-left: 300px solid rgba(0, 234, 255, 1);
    border-right: 300px solid transparent;
    border-top: 300px solid rgba(0, 234, 255, 1);
    border-bottom: 300px solid transparent;
    box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transform: translateX(-500px);
    transition: all 0.8s ease;
    .el-icon{
      position: absolute;
      top: -300px;
      left: -300px;
      font-size: 40px;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.5s ease;
      &:hover {
        transform: rotate(210deg);
      }
    }
    .el-avatar {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
      opacity: 0;
      transform: scale(0);
      transition: transform 0.8s ease 0.8s;
    }
  }

  .VisitorProfileContent {
    transform: translateX(500px);
    opacity: 0;
    position: absolute;
    top: 0;
    right: 50px;
    width: auto;
    height: 100%;
    min-height: 100%;
    min-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(28, 228, 199, 0.8);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
    transition: all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);

    .Info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;

      .NickName {
        position: relative;
        top: -80px;
        font-size: 60px;
        color: #ffffff;
        font-weight: bold;
      }

      form {
        position: relative;
        top: -50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        .el-button {
          border: none;
          position: relative;
          top: 80px;
          width: 220px;
          height: 40px;
          transform: skewX(-20deg);
          font-size: 40px;
          background: none;
          color: white;
          border-radius: 0;

          &:hover {
            color: black;
          }
        }

        .form-control {
          position: relative;
          margin: 30px 0;
          width: 70%;
          left: -20px;
          display: flex;
          justify-content: flex-start;
          align-items: center;

          label {
            transform: translateX(120px);
            font-size: 30px;
            color: #ffffff;
            margin-right: 20px;
            cursor: pointer;
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);

            &.labelShow {
              transform: translateX(0);
            }
          }

          input {
            height: 40px;
            font-size: 30px;
            border: none;
            border-bottom: 2px solid #ffffff;
            background: none;
            color: #ffffff;
            transition: all 0.5s linear;
            width: 0;
            opacity: 0;

            &::-webkit-input-placeholder {
              color: rgba(255, 255, 255, 0.7);
            }

            &.inputShow {
              outline: none;
              width: 300px;
              opacity: 1;
            }
          }
        }
      }
    }
  }
}

.VisitorProfileCard.enter {
  .VisitorProfileLabel {
    opacity: 1;
    transform: translateX(0);
    .el-avatar {
      opacity: 1;
      transform: scale(5);
    }
  }
  .VisitorProfileContent {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>