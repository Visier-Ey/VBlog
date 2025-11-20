<template>
  <div class="w-full flex justify-center">
    <MathVisual></MathVisual>
    <div class="w-full max-w-14xl p-20">
      <!-- Masonry Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="p in projects" :key="p.id" class="break-inside-avoid cursor-pointer relative overflow-hidden rounded-3xl
         bg-white/10 border border-white/20 shadow-xl
         hover:shadow-2xl hover:-translate-y-3 transition-all duration-300
         glass-card p-0" @click="openDetail(p.id, p.githubLink)">

          <div class="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl border-b border-white/10">
            <img v-if="p.cover || '/default-cover.jpg'" :src="p.cover" alt="cover" class="w-full h-full object-cover" />

            <div v-else class=" w-full h-full flex items-center justify-center 
           text-white text-6xl font-bold 
           bg-gradient-to-br from-white/20 to-white/10">
              {{ p.name.substring(0, 1).toUpperCase() }}
            </div>

            <div class="absolute inset-0 bg-white/10 "></div>
          </div>
          <!-- 内容区域 -->
          <div class="p-6 space-y-3 text-gray-100">
            <h2 class="text-xl font-semibold line-clamp-2">{{ p.name }}</h2>
            <p class="text-sm text-gray-300 line-clamp-3">{{ p.description }}</p>
          </div>
        </div>
      </div>

      <div v-if="projects.length === 0" class="text-center text-gray-500 py-10">
        暂无作品展示
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent  } from "vue";
import { useRouter } from "vue-router";
import { getProjects } from "../../../api/projects";
const MathVisual = defineAsyncComponent(() => 
    import('../../components/Bg/MathVisual.vue')
)
const projects = ref([]);
const router = useRouter();

onMounted(async () => {
  const resp = await getProjects();
  projects.value = resp.data || [];
});

function openDetail(id: string, githubLink?: string) {
  // router.push(`/projects/${id}`);
  if (githubLink) {
    window.open(githubLink, '_blank');
  }
}
</script>

<style scoped>
/* 文字截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
