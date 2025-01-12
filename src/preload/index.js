import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

contextBridge.exposeInMainWorld('audioAlertApi', {
  saveToJSON: (data) => ipcRenderer.send('save-to-json', data),
  readJson: () => ipcRenderer.invoke('read-json'),
});

contextBridge.exposeInMainWorld('openDialogApi', {
  selectFile: () => ipcRenderer.invoke('dialog:openFile'), // Usamos `invoke` para enviar e receber a resposta
});

contextBridge.exposeInMainWorld('audioApi', {
  playAudio: (callback) => ipcRenderer.on('play-audio', (event, audioPath) => {
    callback(audioPath);
  }),
});


// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
