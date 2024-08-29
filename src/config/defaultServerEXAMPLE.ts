import {ServerInterface} from "@/assets/ServerInterface";

export const defaultServers : ServerInterface[] = [
  {
    name: 'pihole',
    label: 'Pi Hole',
    power_on: false,
    online: false,
    status: 'Unknown',
    users: []
  },
  {
    name: 'plex',
    label: 'Plex',
    power_on: false,
    online: false,
    status: 'Unknown',
    users: []
  },
];
