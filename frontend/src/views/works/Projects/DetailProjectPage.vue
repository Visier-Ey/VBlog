<template>
  <div class="p-8 space-y-8">
    <!-- 标题 -->
    <h1 class="text-4xl font-bold text-gray-800 tracking-wide">
      📁 作品展览
    </h1>

    <!-- 外部卡片 -->
    <div
      class="bg-white/70 backdrop-blur-md border border-gray-200 
             rounded-2xl shadow-lg hover:shadow-xl transition-all p-6"
    >
      <table class="w-full table-auto">
        <thead>
          <tr class="text-gray-700 border-b">
            <th class="p-4 text-left font-semibold">名称</th>
            <th class="p-4 text-left font-semibold">状态</th>
            <th class="p-4 text-left font-semibold">创建时间</th>
            <th class="p-4 text-left font-semibold w-24">操作</th>
          </tr>
        </thead>

        <tbody>
          <!-- 空数据 -->
          <tr v-if="projects.length === 0">
            <td colspan="4" class="text-center py-10 text-gray-400">
              暂无作品数据
            </td>
          </tr>

          <!-- 数据行 -->
          <tr
            v-for="p in projects"
            :key="p.id"
            class="border-b last:border-0 hover:bg-gray-100/60 
                   transition-all duration-200"
          >
            <!-- 名称 -->
            <td class="p-4 text-gray-900 font-medium">
              {{ p.name }}
            </td>

            <!-- 状态 -->
            <td class="p-4">
              <span
                class="px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                :class="statusClass(p.status)"
              >
                {{ p.status }}
              </span>
            </td>

            <!-- 时间 -->
            <td class="p-4 text-gray-600">
              {{ p.createTime }}
            </td>

            <!-- 操作 -->
            <td class="p-4">
              <button
                class="px-4 py-1.5 bg-blue-600 text-white rounded-lg 
                       shadow hover:shadow-md hover:bg-blue-700 
                       active:scale-95 transition-all"
                @click="openDetail(p.id)"
              >
                查看
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getProjects } from "../../../api/projects";

const projects = ref([]);
const router = useRouter();

onMounted(async () => {
  const resp = await getProjects();
  projects.value = resp.data || [];
});

function openDetail(id: string) {
  router.push(`/projects/${id}`);
}

/** 状态颜色优化 */
function statusClass(status: string) {
  switch (status) {
    case "draft":
      return "bg-gray-100 text-gray-700";
    case "published":
      return "bg-green-100 text-green-700";
    case "archived":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
</script>

<style scoped></style>
