<script setup lang="ts">
//
window.LATEST_ARTICLES = [
  {
    title: 'Find new ways to travel north',
    publishDate: '2023-06-03T13:51:50.417Z',
    category: 'news',
    url: '/articles/4738.html',
  },
  {
    title: 'When will it become possible to use time travel in order to fix your earlier mistakes?',
    publishDate: '2023-06-01T12:18:10.317Z',
    category: 'essay',
    url: '/articles/7256.html',
  },
  {
    title: '10 ways to write better text',
    publishDate: '2023-06-03T09:00:32.200Z',
    category: 'news',
    url: '/articles/7247.html',
  },
  {
    title: 'Announcement: we have a new website category',
    publishDate: '2023-05-30T17:12:13.102Z',
    category: 'news',
    url: '/articles/1749.html',
  },
  {
    title: 'Weekly news',
    publishDate: '2023-05-29T00:23:15.276Z',
    category: 'news',
    url: '/articles/1538.html',
  },
  {
    title: 'In-depth travel guide for Tanzania',
    publishDate: '2023-05-31T11:12:43.003Z',
    category: 'essay',
    url: '/articles/2594.html',
  },
]

import { ref, onMounted } from 'vue'

const data = ref<{
  latestUpdates: []
} | null>(null)

onMounted(() => {
  data.value = {
    latestUpdates: window.LATEST_ARTICLES,
  }
})
</script>

<template>
  <div class="latest-updates">
    <h2>Latest Updates</h2>
    <div class="filter-box">
      <div>
        <input id="news" type="checkbox" />
        <label for="news">News</label>
      </div>

      <div>
        <input id="essays" type="checkbox" />
        <label for="essays">Essays</label>
      </div>
    </div>
    <div class="article-box">
      <ul v-if="data?.latestUpdates.length">
        <li v-for="article in data?.latestUpdates" :key="article.url">
          {{ article.title }} - {{ article.publishDate }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.latest-updates {
  width: 100%;
  max-width: 500px;
}
.filter-box {
  display: flex;
  justify-content: space-evenly;
}
input + label {
  margin-left: 0.25rem;
}
</style>
