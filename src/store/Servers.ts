import { defineStore } from 'pinia'
import {ServerInterface} from "@/assets/ServerInterface";
import {computed, ComputedRef, Ref, ref} from "vue";
import {defaultServers} from "@/config/defaultServers";
import {request} from "@/assets/RequestAPI";

export const useServerStore = defineStore('servers', () => {
  const servers: Ref<ServerInterface[]> = ref([...defaultServers]);

  function fetchServers() {
    for (const server of servers.value) {
      request('server-state', server.name).then((data) => {
        server.status = data.last_action	;
      }).catch(() => {
        server.status = 'error';
      });

      request('server-online', server.name).then((data) => {
        server.online = data.online;
      }).catch(() => {
        server.online = false;
      });

      request('server-on', server.name).then((data) => {
        server.power_on = data.on;
      }).catch(() => {
        server.power_on = false;
      });

      request('list-users', server.name).then((data) => {
        server.users = data.users.sort((a: string, b: string) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
      }).catch(() => {
        server.users = [];
      });
    }
  }

  fetchServers();
  let updateCycle : Ref<NodeJS.Timeout | null> = ref(setInterval(fetchServers, 5000));

  function stopUpdateCycle() {
    if (updateCycle.value) {
      clearInterval(updateCycle.value);
      updateCycle.value = null;
    }

    console.log('Cycle stopped')
  }

  function startUpdateCycle() {
    if (updateCycle.value) {
      return;
    }
    updateCycle.value = setInterval(fetchServers, 5000);

    console.log('Cycle started')
  }

  function addUserToServer(serverName: string, userName: string) {
    userName = userName.trim();

    if(!userName) {
      return false;
    }

    const server = servers.value.find(server => server.name === serverName);

    if(!server) {
      return false;
    }

    if(server.users.includes(userName)) {
      return false;
    }

    server.users.push(userName);
    return true;
  }

  function removeUserFromServer(serverName: string, userName: string) {
    const server = servers.value.find(server => server.name === serverName);

    if(!server) {
      return false;
    }

    const index = server.users.indexOf(userName);

    if(index === -1) {
      return false;
    }

    server.users.splice(index, 1);
    return true;
  }

  const cycleRunning: ComputedRef<boolean> = computed(() => {
    return updateCycle.value !== null;
  });

  return {
    servers,
    addUserToServer,
    removeUserFromServer,
    startUpdateCycle,
    stopUpdateCycle,
    cycleRunning
  }
})
