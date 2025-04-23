<template>
  <DynamicBg
      :bg="bg"
  />
  <div class="container">
    <el-timeline style="max-width: 600px">
      <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :hollow="activity.hollow"
          :timestamp="activity.timestamp"
      >
        <el-card>
          <h2>{{ activity.title }}</h2>
          <p v-for="(content,index) in activity.content">{{ index + 1 }}.{{ content }}</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item
          :timestamp="now"
      >
        <el-card>
          <h2>Now</h2>
          <p>Maybe is time to start</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts" setup>
import {ElTimeline,ElTimelineItem,ElCard} from 'element-plus';
import 'element-plus/dist/index.css';
import {MoreFilled} from '@element-plus/icons-vue'
import {ref} from 'vue'
import DynamicBg from "../../component/DynamicBg.vue";
import {formatDate} from "../../../component/format/formatDate.js";

// set background video
const bg = {
  poster: '',
  webm: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1263950/4d466f77edf3265a253fba79d47bc91a37e34920.webm',
  mp4: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1263950/248954cba9bc08b6e16c676f5c1814ff823af907.mp4',
}
// timeline data activities
const activities = [
  {
    title: 'Basic construction completed',
    content: ['Finished the router', 'Finished the Homepage Skeleton screen', 'Finished the Time-Travel page'],
    timestamp: '2024/9/29',
    size: 'large',
    type: 'primary',
    icon: MoreFilled,
  },
  {
    title: 'Basic construction completed',
    content: ['BlogBriefs half completed',
      'BlogsPage half completed',
      'ContactPage half completed',
      'Add the Blur effect and ScaleBoll effect to make the page switch smoothly'],
    timestamp: '2024/9/30',
    color: 'red',
    size: 'large',
  },
  {
    title: 'Basic construction completed',
    content: ['ProfilesPage half completed',
      'Further improve the blog page',
      'BlogBriefs completed'],
    timestamp: '2024/10/1',
    size: 'large',
    color: 'lightgreen',
  },
  {
    title: 'Basic construction completed',
    content: ['Achieve the basic encrypt',
      'Add the Poetry page and complete it',
      'Encapsulated dynamic background components'],
    timestamp: '2024/10/3',
    type: 'primary',
    hollow: true,
  },
  {
    title: 'Refactor Work',
    content: ['Refactor the BlogsPage',
      'Refactor some components and pages',
      'Encapsulated the markdown component'],
    size: 'large',
    timestamp: '2024/10/4',
  },
  {
    title: 'Basic construction completed',
    content: ['Add the LifeChips component',
      'Almost completed the LifeChipPhoto and LifeChipVideo components',
      'Improve the linux initial bash script'],
    size: 'large',
    timestamp: '2024/10/6',
  },
  {
    title: 'Basic construction completed',
    content: ['Continue to improve the lifeChips component'],
    size: 'large',
    timestamp: '2024/10/7',
  }, {
    title: 'Refactor Work',
    content: [
      'Refactor the Homepage',
      'Refactor SwitchBoll(smooth switch effect)',
    ],
    timestamp: '2024/10/13',
  }, {
    title: 'Basic construction completed',
    content: [
      'Add the UniversalPage',
      'Add the UniversalBlogBrief',
      'Add the SpecialBack',
      'Configured SSL',],
    timestamp: '2024/10/15',
  }, {
    title: 'Basic construction completed',
    content: [
      'Add the VisitorLoginPage',
      'Add the VisitorRegisterPage',
      'Add the JwtToken authentication',
      'Add the Various api',
    ],
    color: 'green',
    timestamp: '2024/10/17',
  },
  {
    title: 'Basic construction completed',
    content: [
      'Add the EmailVerify(backend)',
      'Add the VisitorPage',
      'Add the VisitorPageApi'
    ],
    color: 'green',
    timestamp: '2024/10/19',
  }, {
    title: 'Refactor Work',
    content: [
      'Refactor the Homepage Profile',
    ],
    color: 'green',
    timestamp: '2024/10/31',
  }, {
    title: 'Refactor Work',
    content: [
      'Refactor the RecentPage and others',
      'Complete the BackendAPI',
    ],
    color: 'green',
    timestamp: '2024/11/3',
  }
]

// back to home function

const now = ref(formatDate(new Date()));
setInterval(() => {
  now.value = formatDate(new Date());
  console.log(now.value);
}, 1000);

</script>

<style scoped>

.container {
  position: relative;
  top: 20px;
  height: auto;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 40px;
}

.el-card {
  text-align: left;
  background: rgb(0, 0, 0, 0.5);
  color: white;
}

.el-timeline {
  position: relative;
  color: white;
  top: 10px;
  left: -50px;

  :deep(.el-timeline-item__content) {
    color: white;
  }

  :deep(.el-timeline-item__timestamp) {
    color: white;
    margin-bottom: 20px;
  }
}
</style>