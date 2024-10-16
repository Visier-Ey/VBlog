<script setup>

</script>

<template>
  <div class="universalBlogBrief">
    <div class="universalBlogCard">
      <div class="title">OOPDESIGN</div>
      <div class="right">
        <div class="date">2023/10/15</div>
        <div class="category">Program</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.universalBlogBrief {
  width: 100%;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  &:hover {
    transform: translateX(20px) translateY(10px);
  }
}

.universalBlogCard {
  background: white;
  color: black;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  padding: 10px 20px;
  width: 90%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .title {
    font-size: 25px;
    font-weight: bold;
    margin-right: 10px;
  }
  .right{
    margin-right: 10px;
    display: flex;
    align-items: center;
    .date {
      font-size: 15px;
      margin-right: 10px;
    }
    .category {
      font-size: 15px;
    }
  }
}
</style>