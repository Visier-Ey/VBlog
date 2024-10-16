<template>
<div class="SidebarArea" ref="sidebarAreaDOM">
<div class="SidebarRotateCollapse">
  <div class="Sidebar">
    Diving
    <pre>
      这里是游客信息，
      还没做，
      {{
        zeroWidthEncrypt('零宽字符藏个彩蛋', base64Encrypt('Recently, influenced by the sweet fragrance of osmanthus, my desire to love her has grown intensely, and this feeling of love seems to be constantly flowing from my heart, spreading throughout my entire being.'))
      }},
      还有一个常见加密,
      诸君且看星宇
    </pre>
  </div>
</div>
</div>
</template>

<script lang="ts" setup>
import {zeroWidthEncrypt,base64Encrypt} from "../../component/encryp";
import {onMounted, ref} from "vue";
const sidebarAreaDOM = ref<HTMLDivElement | null>(null);
onMounted(() => {
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
.SidebarArea{
  z-index: 900;
  margin: 0;
  width: 100px;
  height: 100vh;
  background: inherit;
  position: fixed;
  left: 0;
  top: 0;
}
.SidebarRotateCollapse{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 100%;
  background: inherit;
  position: relative;
  transition: all 0.5s ease;
  opacity: 0;
  overflow-x: hidden;
  border-right: solid 1px rgba(2, 234, 255, 0.8);
  border-top: solid 1px rgba(2, 234, 255, 0.8);
  transform-style: preserve-3d;
  transform-origin: 0 0 0;
  transform: rotateY(80deg) skewY(20deg) translateY(100px) translateX(100px);
  &:hover{
    opacity: 1;
    transform: rotateY(10deg) skewY(8deg) translateY(-5px);
  }
}
.Sidebar{
  width: 100%;
  height: 90%;
  background: rgba(0,0,0,0.1);
  position: relative;
  left: 0;
  top: 0;
  color: white;
  font-size: 60px;
  pre{
    margin-top: 100px;
    font-size: 25px;
    text-align: left;
  }
}

.SidebarArea:hover{
  .SidebarRotateCollapse{
    opacity: 1;
    transform: rotateY(10deg) skewY(8deg) translateY(-5px);
  }
}
</style>