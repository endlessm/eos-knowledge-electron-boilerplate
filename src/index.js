import { app, BrowserWindow, protocol } from 'electron'
import { Engine } from 'eos-knowledge-content'
import { registerService } from 'dbus'
import yargs from 'yargs'

const packageJson = require('../package.json')
const appId = packageJson.config.forge.electronInstallerFlatpak.id
const appObjectPath = '/' + appId.replace(/\./g, '/')

const argv = yargs
  .help('help')
  .boolean('i')
  .describe('i', 'Open the inspector')
  .alias('i', 'inspector')
  .argv

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false
  })
  mainWindow.maximize()
  mainWindow.setMenu(null)
  mainWindow.show()

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  if (argv.inspector) {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.on('will-navigate', (event, url) => {
      event.preventDefault()
    })
  })
}

const setupEknProtocol = () => {
  // Setup knowledge content
  const engine = Engine.get_default()
  engine.default_app_id = appId

  protocol.registerBufferProtocol('ekn', (request, callback) => {
    const { mime_type, data } = engine.get_domain().read_uri(request.url)
    callback({ mimeType: mime_type, data })
  }, (error) => {
    if (error) console.error('Failed to register ekn protocol')
  })
}

let service

const setupDBus = () => {
  service = registerService('session', appId)
  const object = service.createObject(appObjectPath)
  const iface = object.createInterface('com.endlessm.KnowledgeSearch')
  iface.addMethod('LoadItem', {
    in: [
      { type: 's', name: 'EknID' },
      { type: 's', name: 'Query' },
      { type: 'u', name: 'Timestamp' }
    ]
  }, (id, query, timestamp, callback) => {
    mainWindow.webContents.send('LoadItem', id, query, timestamp)
    callback()
  })
  iface.addMethod('LoadQuery', {
    in: [
      { type: 's', name: 'Query' },
      { type: 'u', name: 'Timestamp' }
    ]
  }, (query, timestamp, callback) => {
    mainWindow.webContents.send('LoadQuery', query, timestamp)
    callback()
  })
  iface.update()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  setupEknProtocol()
  createWindow()
  // Wait till the window has finished loading before registering on the bus, so
  // we can send messages straight over to the browser process.
  mainWindow.webContents.on('did-finish-load', () => {
    setupDBus()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit()
  if (service) service.disconnect()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
