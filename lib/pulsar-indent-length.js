"use babel";

import { CompositeDisposable } from "atom";

export default {

  subscriptions: null,
  indentLengthTile: null,
  config: {
    statusbar: {
      title: "Status Bar",
      description: "Toggles text in status bar that tells current tab length (Restart Required)",
      type: "boolean",
      default: true
    },
    notifications: {
      title: "Notifications",
      description: "Sends an alert/notification that the tab length has changed",
      type: "boolean",
      default: true
    }
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    // Register command that changes tab length to 2
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "indent-length:set-indent-length-2": () => {
        this.setTabLength(2);
      }
    }));

    // Register command that changes tab length to 4
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "indent-length:set-indent-length-4": () => {
        this.setTabLength(4);
      }
    }));

    // Register command that changes tab length to default
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "indent-length:set-indent-length-default": () => {
        this.setTabLength(null);
      }
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    if (this.indentLengthTile) {
      this.indentLengthTile.destroy();
    }
    this.indentLengthTile = null;
  },

  setTabLength(length) {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      atom.config.set("editor.tabLength", length);
      if (atom.config.get("pulsar-indent-length.notifications") === true) {
        if (length === null) {
          atom.notifications.addInfo(`Indent length set to default!`);
        }
        else {
          atom.notifications.addInfo(`Indent length set to ${length}!`);
        }
      }
      if (this.indentLengthTile) {
        this.indentLengthTile.item.textContent = `Tab Length: ${length || 2}`;
      }
    }
  },

  consumeStatusBar(statusBar) {
    if (atom.config.get("pulsar-indent-length.statusbar") === true) {
      const element = document.createElement("div");
      element.classList.add("inline-block");
      element.textContent = `Tab Length: ${atom.config.get("editor.tabLength")}`;
      this.indentLengthTile = statusBar.addRightTile({
        item: element,
        priority: 200
      });
    }
  }
};
