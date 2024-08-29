<script lang="ts" setup>
import {useServerStore} from "@/store/Servers";
import {storeToRefs} from "pinia";
import {IMAGE_COUNT} from "@/config/config";

const serverStore = useServerStore();
const { cycleRunning } = storeToRefs(serverStore);
const { startUpdateCycle, stopUpdateCycle } = serverStore;
</script>


<template>
  <v-app-bar>
    <v-img
      :src="`/imgs/${Math.floor(Math.random() * IMAGE_COUNT) + 1}.png`"
      aspect-ratio="1"
      class="mx-2"
      max-height="64"
      max-width="64"
    />
    <v-app-bar-title
      class="text-h5"
    >
      Server Interface
    </v-app-bar-title>
    <v-spacer />
    <v-btn
      :icon="cycleRunning ? 'mdi-sync' : 'mdi-sync-off'"
      @click="serverStore.cycleRunning ? stopUpdateCycle() : startUpdateCycle()"
    />
  </v-app-bar>
</template>

