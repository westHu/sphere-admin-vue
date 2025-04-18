<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
      <div class="container relative mx-auto py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">{{ t('about.title') }}</h1>
          <p class="mt-6 text-lg text-muted-foreground">
            {{ t('about.description') }}
          </p>
        </div>
      </div>
    </div>

    <!-- 使命与愿景 -->
    <div class="container mx-auto py-16">
      <div class="grid gap-12 md:grid-cols-2">
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-md bg-primary/10 text-primary">
              <svg
                class="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 2v20" />
                <path d="M2 12h20" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M12 2a10 10 0 0 0-10 10" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold">{{ t('about.mission.title') }}</h2>
          </div>
          <p class="text-muted-foreground">
            {{ t('about.mission.description') }}
          </p>
        </div>
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-md bg-primary/10 text-primary">
              <svg
                class="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 2v20" />
                <path d="M2 12h20" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M12 2a10 10 0 0 0-10 10" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold">{{ t('about.vision.title') }}</h2>
          </div>
          <p class="text-muted-foreground">
            {{ t('about.vision.description') }}
          </p>
        </div>
      </div>
    </div>

    <!-- 核心价值观 -->
    <div class="bg-muted/50">
      <div class="container mx-auto py-16">
        <h2 class="text-3xl font-bold text-center mb-12">{{ t('about.values.title') }}</h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="(value, key) in values"
            :key="key"
            class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 rounded-md bg-primary/10 text-primary">
                <component :is="value.icon" class="size-5" />
              </div>
              <h3 class="text-xl font-semibold">{{ t(`about.values.items.${key}.title`) }}</h3>
            </div>
            <p class="text-muted-foreground">{{ t(`about.values.items.${key}.description`) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 团队介绍 -->
    <div class="container mx-auto py-16">
      <h2 class="text-3xl font-bold text-center mb-12">{{ t('about.team.title') }}</h2>
      <div class="grid gap-8 md:grid-cols-3">
        <div
          v-for="(member, key) in team"
          :key="key"
          class="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div class="aspect-square overflow-hidden">
            <img
              :src="member.image"
              :alt="t(`about.team.members.${key}.name`)"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold">{{ t(`about.team.members.${key}.name`) }}</h3>
            <p class="text-sm text-muted-foreground mb-4">{{ t(`about.team.members.${key}.position`) }}</p>
            <p class="text-muted-foreground">{{ t(`about.team.members.${key}.description`) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系我们 -->
    <div class="bg-muted/50">
      <div class="container mx-auto py-16">
        <div class="grid gap-12 lg:grid-cols-2">
          <!-- 联系信息 -->
          <div class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold mb-4">{{ t('about.contact.title') }}</h2>
              <p class="text-muted-foreground max-w-2xl">
                {{ t('about.contact.description') }}
              </p>
            </div>
            
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="p-2 rounded-md bg-primary/10 text-primary">
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">{{ t('about.contact.phone.title') }}</h3>
                  <p class="text-muted-foreground">{{ t('about.contact.phone.hours') }}</p>
                  <p class="text-primary font-medium">{{ t('about.contact.phone.number') }}</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="p-2 rounded-md bg-primary/10 text-primary">
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">{{ t('about.contact.email.title') }}</h3>
                  <p class="text-muted-foreground">{{ t('about.contact.email.response') }}</p>
                  <p class="text-primary font-medium">{{ t('about.contact.email.address') }}</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="p-2 rounded-md bg-primary/10 text-primary">
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold">{{ t('about.contact.address.title') }}</h3>
                  <p class="text-muted-foreground">{{ t('about.contact.address.welcome') }}</p>
                  <p class="text-primary font-medium">{{ t('about.contact.address.location') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 联系表单 -->
          <div class="rounded-xl border bg-card p-8">
            <h3 class="text-2xl font-semibold mb-6">{{ t('about.contact.form.title') }}</h3>
            <form class="space-y-6">
              <div class="space-y-2">
                <label class="text-sm font-medium" for="name">{{ t('about.contact.form.name.label') }}</label>
                <input
                  id="name"
                  type="text"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :placeholder="t('about.contact.form.name.placeholder')"
                />
              </div>
              
              <div class="space-y-2">
                <label class="text-sm font-medium" for="email">{{ t('about.contact.form.email.label') }}</label>
                <input
                  id="email"
                  type="email"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :placeholder="t('about.contact.form.email.placeholder')"
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium" for="message">{{ t('about.contact.form.message.label') }}</label>
                <textarea
                  id="message"
                  class="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  :placeholder="t('about.contact.form.message.placeholder')"
                ></textarea>
              </div>

              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 w-full"
              >
                {{ t('about.contact.form.submit') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Value {
  title: string
  description: string
  icon: string
}

interface TeamMember {
  name: string
  position: string
  description: string
  image: string
}

const values = {
  innovation: {
    icon: 'Lightbulb',
  },
  professional: {
    icon: 'Award',
  },
  responsibility: {
    icon: 'Shield',
  },
}

const team = {
  member1: {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  member2: {
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
  member3: {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  },
}

// 图标组件
const Lightbulb = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  `,
}

const Award = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  `,
}

const Shield = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  `,
}
</script> 