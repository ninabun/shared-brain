const { app, BrowserWindow, shell, Menu } = require("electron");
const path = require("node:path");

const defaultAppUrl = "https://sharedbrain-92f19.web.app";

function appUrl() {
  if (process.env.SHARED_BRAIN_DESKTOP_URL === "file") {
    return `file://${path.join(__dirname, "..", "dist", "index.html")}`;
  }
  return process.env.SHARED_BRAIN_DESKTOP_URL || defaultAppUrl;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1320,
    height: 920,
    minWidth: 980,
    minHeight: 720,
    title: "Shared Brain",
    backgroundColor: "#07121d",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadURL(appUrl());

  win.webContents.setWindowOpenHandler(({ url }) => {
    const current = appUrl();
    if (url.startsWith(current) || url.includes("firebaseapp.com") || url.includes("google.com")) {
      return { action: "allow" };
    }
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, url) => {
    const current = appUrl();
    if (url.startsWith(current) || url.includes("firebaseapp.com") || url.includes("google.com")) {
      return;
    }
    event.preventDefault();
    shell.openExternal(url);
  });
}

function installMenu() {
  const template = [
    {
      label: "Shared Brain",
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { role: "togglefullscreen" },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  installMenu();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
