const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('hackerAPI', {
  startFakeHack: () => ipcRenderer.send('start-fake-hack')
});

// Recebe comando do main.js para rodar o fake hacker
ipcRenderer.on('run-fake-hack', () => {
  if (window.startFakeHack) window.startFakeHack();
});
