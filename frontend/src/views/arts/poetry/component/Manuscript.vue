<template>
  <div class="manuscript">
    <span class="writer">Dear  {{ props.poetry.writer }}</span>
    <span class="content" id="markdown">
      {{ content }}
        </span>
    <span class="recipient">Your {{ props.poetry.recipient }}</span>
  </div>
</template>

<script lang="ts" setup>
import {loadMarkdownFile} from "../../../../component/markdown";
import {onMounted, ref} from "vue";
// set the props
const content = ref('');
// define props
interface ManuscriptProps {
  manuscriptUrl?: string;
  title?: string;
  content?: string;
  recipient?: string;
  writer?: string;
  date?: string;
}

interface Props {
  poetry: ManuscriptProps;
}

const props = defineProps<Props>();

// load markdown content
onMounted(() => {
  if (props.poetry.manuscriptUrl)
    loadMarkdownFile(props.poetry.manuscriptUrl, 'markdown');
  else {
    content.value = props.poetry.content;
  }
});
</script>

<style scoped>
.manuscript {
  width: 90%;
  position: relative;
  min-height: 950px;
  border-bottom: solid 1px #eff480;
  top: -20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top:20px;

  span {
    width: 100%;
    text-align: left;
    color: #eff480;
    font-family: Baskerville Old Face;
  }

  span[class="writer"] {
    display: block;
    font-size: 40px;
    font-weight: bold;
    margin-top: 50px;
  }
  p{
    font-size: 22px;
    font-weight: bold;
    margin-top: 10px;
    line-height: 37px;
  }

  .content {
    margin-top: 60px;
    width: 80%;
    display: block;
    font-size: 22px;
    font-weight: bold;
    line-height: 37px;
    font-family: cursive;
  }

  span[class="recipient"] {
    display: block;
    font-size: 40px;
    font-weight: bold;
    margin-top: 10px;
    text-align: right;
    position: absolute;
    bottom: 70px;
    right: 10px;
  }
}
</style>