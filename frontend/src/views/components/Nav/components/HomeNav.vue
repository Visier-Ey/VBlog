<template>
  <div class="Nav-wrapper">
    <div class="user">
      {{ props.nick.toUpperCase() || 'VISIER' }}
    </div>

    <div class="nav">
      <div class="menu">

        <!-- 动态生成菜单 -->
        <div v-for="item in navigation" :key="item.name" class="link" :class="{ list: item.items }"
          :data-custom-id="item.name" :data-custom-amount="item.items ? item.items.length : 0"
          @click="() => handleClick(item)">
          {{ zeroWidthEncrypt(item.name.toUpperCase(), 'visier') }}

          <!-- 子菜单 -->
          <div v-if="item.items" class="group">
            <div v-for="child in item.items" :key="child.name" class="link" :data-custom-id="child.name"
              @click="() => handleClick(child)">
              {{ zeroWidthEncrypt(child.name.toUpperCase(), 'visier') }}
            </div>
          </div>
        </div>

      </div>

      <div class="tool"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { zeroWidthEncrypt } from "../../../../utils/encryp";
import router from "../../../../router";

interface NavItem {
  name: string;
  link: string;
  items?: NavItem[];
}

const navigation = ref<NavItem[]>([]);

const handleClick = (item: NavItem) => {
  if (!item.link) return;
  router.push(item.link);
};

onMounted(async () => {
  const res = await fetch("http://localhost:3000/backend/postcardLayouts/get");
  const json = await res.json();
  navigation.value = json.navigation.items;
});

interface Props {
  nick: string;
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
    color: rgba(255, 255, 255, 0.9);
    font-family: "Potra";
    position: absolute;
    left: 5%;
    padding: 0 10px;
    font-weight: 70;
    font-size: 100px;
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

    &:hover[data-custom-amount="1"] .group {
      height: 50px;
    }

    &[data-custom-amount="3"] .link {
      height: 33%;
    }

    &[data-custom-amount="2"] .link {
      height: 50%;
    }

    &[data-custom-amount="1"] .link {
      height: 100%;
    }

    .group {
      transition: all 0.3s ease;
      position: absolute;
      top: 55px;
      margin: 0;
      overflow: hidden;
      height: 0;
      opacity: 0;

      .link:hover {
        cursor: pointer;
        transform: skewX(-10deg);
        opacity: 1;
      }
    }
  }

  .link {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    color: white;
    margin: 0;
    padding: 0 10px;
    transition: all 0.3s ease;
    font-family: "D-DIN-PRO";
    font-size: 30px;
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