<script lang="ts" setup>
import {useServerStore} from "@/store/Servers";
import {storeToRefs} from "pinia";
import ServerCard from "@/components/ServerCard.vue";

const serverStore = useServerStore();
const { servers } = storeToRefs(serverStore);

</script>

<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(server, index) in servers"
        :key="index"
      >
        <ServerCard
          :server="server"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
