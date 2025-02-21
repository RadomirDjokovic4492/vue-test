<script setup lang="ts">
enum ECategory {
  NEWS = 'news',
  ESSAY = 'essay',
}

interface ICategory {
  value: string
  title: string
  checked: boolean
}

interface Article {
  title: string
  publishDate: string
  category: ECategory
  url: string
}

window.LATEST_ARTICLES = [
  {
    title: 'Find new ways to travel north',
    publishDate: '2023-06-03T13:51:50.417Z',
    category: ECategory.NEWS,
    url: '/articles/4738.html',
  },
  {
    title: 'When will it become possible to use time travel in order to fix your earlier mistakes?',
    publishDate: '2023-06-01T12:18:10.317Z',
    category: ECategory.ESSAY,
    url: '/articles/7256.html',
  },
  {
    title: '10 ways to write better text',
    publishDate: '2023-06-03T09:00:32.200Z',
    category: ECategory.NEWS,
    url: '/articles/7247.html',
  },
  {
    title: 'Announcement: we have a new website category',
    publishDate: '2023-05-30T17:12:13.102Z',
    category: ECategory.NEWS,
    url: '/articles/1749.html',
  },
  {
    title: 'Weekly news',
    publishDate: '2023-05-29T00:23:15.276Z',
    category: ECategory.NEWS,
    url: '/articles/1538.html',
  },
  {
    title: 'In-depth travel guide for Tanzania',
    publishDate: '2023-05-31T11:12:43.003Z',
    category: ECategory.ESSAY,
    url: '/articles/2594.html',
  },
]

import { ref, onMounted, computed } from 'vue'

const data = ref<{
  latestUpdates: Article[]
  categories: ICategory[]
} | null>(null)

onMounted(() => {
  data.value = {
    latestUpdates: window.LATEST_ARTICLES,
    categories: [
      {
        value: ECategory.NEWS,
        title: 'News',
        checked: true,
      },
      {
        value: ECategory.ESSAY,
        title: 'Essays',
        checked: true,
      },
    ],
  }
})

const sevenDaysAsMillisecond = 7 * 24 * 60 * 60 * 1000
const visibleArticles = computed(() => {
  return (data.value?.latestUpdates ?? [])
    .filter(
      (article) =>
        (data.value?.categories ?? []).find((c) => c.value === article.category)?.checked,
    )
    .filter(
      (article) =>
        new Date().getTime() - new Date(article.publishDate).getTime() < sevenDaysAsMillisecond,
    )
    .sort((a, b) => (a.publishDate > b.publishDate ? 1 : -1))
    .filter((_, i) => i < 5)
})

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}
</script>

<template>
  <div class="latest-updates">
    <h2>Latest Updates</h2>
    <div class="filter-box">
      <div v-for="category in data?.categories">
        <input :id="category.value" type="checkbox" v-model="category.checked" />
        <label :for="category.value">{{ category.title }}</label>
      </div>
    </div>
    <div class="article-box">
      <ul v-if="visibleArticles.length">
        <li v-for="article in visibleArticles" :key="article.url">
          <div class="list-item">
            <div class="list-item-title">
              <a :href="article.url">
                {{ article.title }}
              </a>
            </div>
            <span class="list-item-hyphen"> - </span>
            <div class="list-item-date">{{ formatDate(article.publishDate) }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.latest-updates {
  width: 100%;
  max-width: 500px;
  border: 1px solid;
}
.filter-box {
  display: flex;
  justify-content: space-evenly;
}
input + label {
  margin-left: 0.25rem;
}
.list-item {
  display: flex;
  justify-content: space-between;
}
.list-item-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-item-hyphen {
  min-width: 1rem;
  text-align: center;
}
.list-item-date {
  white-space: nowrap;
}
</style>
