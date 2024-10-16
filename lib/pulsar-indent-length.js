"use babel";

import { CompositeDisposable } from "atom";

export default {

  subscriptions: null,

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
  },

  setTabLength(length) {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      atom.config.set("editor.tabLength", length);
      if (length == null) {
        atom.notifications.addInfo(`Indent length set to default!`);
      }
      else {
        atom.notifications.addInfo(`Indent length set to ${length}!`);
      }
    }
  }
};
