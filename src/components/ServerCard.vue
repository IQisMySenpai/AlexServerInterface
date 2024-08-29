<script setup lang="ts">
import {ServerInterface} from "@/assets/ServerInterface";
import {ref} from "vue";
import {useServerStore} from "@/store/Servers";

const props = defineProps<{
  server: ServerInterface
}>()

const serverStore = useServerStore();
const { addUserToServer, removeUserFromServer } = serverStore;


const newUser = ref<string>('');

function addUser () {
  if (addUserToServer(props.server.name, newUser.value)) {
    newUser.value = '';
  }
}

function removeUser (user: string) {
  removeUserFromServer(props.server.name, user);
}
</script>

<template>
<v-card
  :append-icon="props.server.icon"
  :title="props.server.label"
  :subtitle="props.server.name"
>
  <v-card-text>
    <v-container
      fluid
      class="pa-0"
    >
      <v-row
        align="center"
        no-gutters
      >
        <v-col
          cols="12"
          md="6"
          class="text-body-1"
        >
          Power:
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-icon
            :color="`${props.server.power_on ? 'green' : 'red'}-lighten-1`"
          >
            mdi-circle
          </v-icon>
          {{ props.server.power_on ? 'On' : 'Less On' }}
        </v-col>
      </v-row>
      <v-row
        align="center"
        no-gutters
      >
        <v-col
          cols="12"
          md="6"
          class="text-body-1"
        >
          Connection:
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-icon
            :color="`${props.server.online ? 'green' : 'red'}-lighten-1`"
          >
            mdi-circle
          </v-icon>
          {{ props.server.power_on ? 'Online' : 'Offline' }}
        </v-col>
      </v-row>
      <v-row
        align="center"
        no-gutters
      >
        <v-col
          cols="12"
          md="6"
          class="text-body-1"
        >
          State:
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          {{ props.server.status }}
        </v-col>
      </v-row>
      <v-divider
        class="my-2"
      />
      <v-row
        align="center"
        no-gutters
      >
        <v-col
          cols="12"
          md="6"
          class="text-body-1"
        >
          Users:
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          {{ props.server.users.length }} Users
        </v-col>
      </v-row>
      <v-row
        align="center"
        no-gutters
        class="py-1"
      >
        <v-col
          cols="12"
          class="d-flex justify-center ga-2 flex-wrap"
        >
          <v-chip
            v-for="(user) in props.server.users"
            :key="user"
            variant="outlined"
            closable
            @click:close="removeUser(user)"
          >
            {{ user }}
          </v-chip>
        </v-col>
      </v-row>
      <v-row
        align="center"
        no-gutters
        class="py-1"
      >
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="newUser"
            label="Add User"
            outlined
            hide-details
            density="comfortable"
            @keydown.enter="addUser"
            append-icon="mdi-plus"
            @click:append="addUser"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
  <v-card-actions>
    <v-spacer/>
    <v-btn
      color="red-lighten-1"
      variant="outlined"
    >
      Reset State
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<style scoped>

</style>
