<template>
  <div class="wrapper">
    <div class="box">
      <div class="right">
        <div class="top">
          <span class="title">{{ props.object.title }}</span>
        </div>
        <div class="content">
          <span class="author">{{ props.object.author }}</span>
          <span class="publisher">{{ props.object.publisher }}</span>
          <span class="abstract">{{ props.object.abstract }}</span>
          <span class="link">Full Text at Publisher</span>
        </div>
      </div>
      <div class="left">
        <div class="aside">
          <span class="number">{{ props.object.like }}</span>
          <span>Like</span>
          <span class="number">{{ props.object.great }}</span>
          <span>Great</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
interface Brief {
  title: string;
  abstract: string;
  author: string;
  publisher: string;
  like: number;
  great: number;
  link?: string;
}

interface Props {
  object: Brief;
}

const props = defineProps<Props>();
</script>

<style scoped>
* {
  margin: 3px 0;
}

.wrapper {
  margin: 0;
  border-bottom: solid 1px gray;
  background: white;
  width: 100%;
  display: flex;
  justify-content: center;

  .box {
    width: 90%;
    border-radius: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin: 20px 0;
  }
}

.box {
  .right {
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .left {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    height: 100%;

    .aside {
      width: 50%;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: flex-start;
      position: relative;
      top: 20px;

      span {
        font-size: 15px;
        color: #5555ff;
        cursor: pointer;
        margin: 0;
      }

      span[class^="number"] {
        margin-top: 20px;
      }
    }
  }
}

.top {
  width: 100%;
  display: flex;

  .title {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
  }
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  span[class^="abstract"] {
    margin-top: 8px;
    font-size: 12px;
  }

  span[class^="author"] {
    font-size: 10px;
    opacity: 0.8;
  }

  span[class^="publisher"] {
    font-size: 10px;
    opacity: 0.8;
  }

  span[class^="link"] {
    font-size: 15px;
    color: #7575ff;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}


</style>