import dotenv from "dotenv";
import { app, BrowserWindow } from "electron";
import path from "path";

dotenv.config();

try {
  import("electron-reload").then((electronReload: any) => {
    electronReload(__dirname, {});
  });
} catch (e) {}

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let START_URL =
    process.env.START_URL ||
    `file://${path.join(__dirname, "/public/index.html")}`;

  mainWindow.loadURL(START_URL);

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
