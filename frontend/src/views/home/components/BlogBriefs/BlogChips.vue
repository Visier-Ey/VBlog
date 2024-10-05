<template>
  <div class="card">
    <div class="header">
      <span class="title">{{ props.title }}</span>
      <span class="date">{{ props.date }}</span>
      <!--      <span class="divider"></span>-->
    </div>
<!--  the body part  -->
    <div class="body">
      <span class="content">{{ props.content }}</span>

    </div>
<!--  footer ,maybe like something else  -->
    <div class="footer">

    </div>
  </div>
</template>

<script lang="ts" setup>

// define the interface of properties
interface Props {
  title: string;
  content: string;
  url?: string;
  date?: string;
  others?: Object;
}

// define the properties
const props = withDefaults(defineProps<Props>(), {
  title: "Test",
  content: "Test",
  url: "",
  date: "2021-10-10"
});

</script>

<style scoped>
.card {
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .header{
    padding: 0 20px;
    position: relative;
    top: 20px;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 2px grey;
    .title{
      font-size: 30px;
      font-weight: bold;
      font-family: "Century Schoolbook";
    }
    .date{
      font-size: 12px;
      color: grey;
    }
  }
  .body{
    text-align: left;
    width: 80%;
    padding: 20px;
    font-size: 20px;
    font-family: "Century Schoolbook";
    .content{
      line-height: 1.5;
    }
  }

}
</style>