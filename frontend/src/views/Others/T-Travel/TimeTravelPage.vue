<template>
  
  <DynamicBg
      :bg="bg"
  />
  <div class="w-full min-h-screen flex flex-col items-center pt-10 px-6">
    <div class="relative w-full max-w-2xl">
      <div v-for="(activity, index) in activities" :key="index" class="flex mb-10">
        <!-- Line + Dot -->
        <div class="flex flex-col items-center mr-6">
          <div class="w-3 h-3 rounded-full" :class="activity.color || 'bg-blue-500'"></div>
          <div class="w-px flex-1 bg-gray-500"></div>
        </div>

        <!-- Card Content -->
        <div class="bg-black/50 text-white p-5 rounded-xl shadow-lg w-full">
          <h2 class="text-xl font-bold mb-2">{{ activity.title }}</h2>
          <p class="text-sm opacity-70 mb-2">{{ activity.timestamp }}</p>
          <ul class="list-decimal list-inside space-y-1">
            <li v-for="(content, idx) in activity.content" :key="idx">{{ content }}</li>
          </ul>
        </div>
      </div>

      <!-- NOW Block -->
      <div class="flex">
        <div class="flex flex-col items-center mr-6">
          <div class="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div class="bg-black/50 text-white p-5 rounded-xl shadow-lg w-full">
          <h2 class="text-xl font-bold mb-2">Now</h2>
          <p class="opacity-80">Maybe it's time to start</p>
          <p class="text-sm opacity-50 mt-2">{{ now }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { formatDate } from '../../../utils/format/formatDate.js'
import DynamicBg from "../../components/Bg/DynamicBg.vue";
const bg = {
  poster: '',
  webm: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1263950/4d466f77edf3265a253fba79d47bc91a37e34920.webm',
  mp4: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/1263950/248954cba9bc08b6e16c676f5c1814ff823af907.mp4',
}
const activities = [
  {
    title: 'Basic construction completed',
    content: ['Finished the router', 'Finished the Homepage Skeleton screen', 'Finished the Time-Travel page'],
    timestamp: '2024/9/29',
    color: 'bg-blue-400'
  },
  {
    title: 'Basic construction completed',
    content: ['BlogBriefs half completed', 'BlogsPage half completed', 'ContactPage half completed', 'Add smooth effects'],
    timestamp: '2024/9/30',
    color: 'bg-red-400'
  },
  {
    title: 'Basic construction completed',
    content: ['ProfilesPage half completed', 'Improve blog page', 'BlogBriefs completed'],
    timestamp: '2024/10/1',
    color: 'bg-green-300'
  },
  {
    title: 'Basic construction completed',
    content: ['Achieve basic encrypt', 'Add Poetry page', 'Dynamic background components'],
    timestamp: '2024/10/3',
    color: 'bg-blue-500'
  },
  {
    title: 'Refactor Work',
    content: ['Refactor BlogsPage', 'Refactor components', 'Markdown components'],
    timestamp: '2024/10/4'
  },
  {
    title: 'Basic construction completed',
    content: ['Add LifeChips', 'LifeChipPhoto/Video components', 'Improve linux bash script'],
    timestamp: '2024/10/6'
  },
  {
    title: 'Basic construction completed',
    content: ['Continue improving LifeChips'],
    timestamp: '2024/10/7'
  },
  {
    title: 'Refactor Work',
    content: ['Refactor Homepage', 'Refactor smooth switch effect'],
    timestamp: '2024/10/13'
  },
  {
    title: 'Basic construction completed',
    content: ['UniversalPage', 'UniversalBlogBrief', 'SpecialBack', 'Configured SSL'],
    timestamp: '2024/10/15'
  },
  {
    title: 'Basic construction completed',
    content: ['Visitor login/register', 'JwtToken auth', 'Various API'],
    timestamp: '2024/10/17',
    color: 'bg-green-500'
  },
  {
    title: 'Basic construction completed',
    content: ['EmailVerify backend', 'VisitorPage', 'VisitorPageApi'],
    timestamp: '2024/10/19',
    color: 'bg-green-500'
  },
  {
    title: 'Refactor Work',
    content: ['Refactor Homepage Profile'],
    timestamp: '2024/10/31'
  },
  {
    title: 'Refactor Work',
    content: ['Refactor RecentPage', 'Complete BackendAPI'],
    timestamp: '2024/11/3'
  },
  {
    title: 'Refactor Work',
    content: ['Refactor Project', 'Change mysql → sqlite3', 'Router interceptor transitions', 'Custom fonts'],
    timestamp: '2025/4/24'
  }
]

const now = ref(formatDate(new Date()))
setInterval(() => {
  now.value = formatDate(new Date())
}, 1000)
</script>

<style scoped>
</style>
