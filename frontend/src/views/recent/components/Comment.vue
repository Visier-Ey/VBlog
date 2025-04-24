<template>
<div class="CommentCard">
  <div class="CommentHeader">
    <span class="CommentAuthor">{{ props.comment.author }}</span>
    <span class="CommentTime">{{ formatDateSQL(props.comment.time) }}</span>
  </div>
  <div class="CommentContent">{{ props.comment.content }}</div>
</div>
</template>

<script lang="ts" setup>
import { formatDateSQL } from '../../../component/format/formatDate';
interface Props {
  comment: {
    author: string;
    time: string;
    content: string;
  };
}
const props: Props = defineProps<Props>();
</script>

<style scoped>
.CommentCard{
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 600px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span{
    padding: 0 5px;
    margin: auto 0;
  }
  .CommentHeader{
    display: flex;
    width: 90%;
    justify-content: space-between;

    .CommentAuthor{
      font-weight: bold;
      font-size: 20px;
    }
    .CommentTime{
      font-size: 12px;
    }
  }
}
</style>