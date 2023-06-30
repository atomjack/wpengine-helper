'use strict';
class WPEngineHelper {
    constructor() {
        const self = this;
        this.docReady(() => {
            setTimeout(function () {
                self.modSFTPPage();
                self.updateDefaultsDisplay();
                self.addSaveDefaultsButton();
            }, 500);
        });
    }
    updateDefaultsDisplay() {
        const el = document.querySelector("#new_checkpoint");
        if (el) {
            chrome.storage.sync.get(["description", "emails"], function (items) {
                setTimeout(() => {
                    if (items.description)
                        document.querySelector('#checkpoint_comment').value = items.description;
                    if (items.emails)
                        document.querySelector('#checkpoint_notification_emails').value = items.emails;
                }, 500);
            });
        }
        else {
        }
    }
    setDefaults() {
        chrome.storage.sync.set({ "description": document.querySelector('#checkpoint_comment').value, "emails": document.querySelector('#checkpoint_notification_emails').value }, function () { });
    }
    addSaveDefaultsButton() {
        const self = this;
        const el = document.querySelector("#new_checkpoint");
        if (el) {
            let button = document.createElement('button');
            button.classList.add('saveDefaults');
            button.classList.add('btn');
            button.classList.add('btn-primary');
            button.innerHTML = 'Save Defaults';
            const footer = el.querySelector('.modal-footer');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                self.setDefaults();
                self.updateDefaultsDisplay();
                button.innerHTML = 'Saved';
                setTimeout(() => {
                    button.innerHTML = 'Save Defaults';
                }, 1500);
            });
            if (footer) {
                footer.prepend(button);
            }
        }
    }
    modSFTPPage() {
        const sftppage = document.querySelectorAll('[id^="SftpUsersPage"]');
        if (sftppage[0]) {
            const strongs = sftppage[0].querySelectorAll('strong');
            strongs.forEach((strong) => {
                const parent = strong.parentElement;
                if (parent) {
                    let a = document.createElement('a');
                    a.classList.add('copyToClipboard1');
                    parent.append(a);
                }
            });
            const buttons = sftppage[0].querySelectorAll('button');
            buttons.forEach((button) => {
                if (button.classList.contains('MuiButton-textPrimary')) {
                    const parent = button.parentElement;
                    if (parent) {
                        parent.style.display = 'flex';
                        parent.style.alignItems = 'center';
                        let a = document.createElement('a');
                        a.classList.add('copyToClipboard2');
                        parent.append(a);
                    }
                }
            });
            Array.from(sftppage[0].getElementsByClassName('copyToClipboard1')).forEach((a) => {
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const parent = a.parentElement;
                    if (parent) {
                        const re = /\<strong\>.*\<\/strong\>(.*)\<a.*\>\<\/a\>/;
                        const matches = parent.innerHTML.match(re);
                        if (matches) {
                            navigator.clipboard.writeText(matches[1]);
                        }
                    }
                });
            });
            Array.from(sftppage[0].getElementsByClassName('copyToClipboard2')).forEach((a) => {
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const parent = a.parentElement;
                    if (parent) {
                        let text = parent.querySelector('button').textContent;
                        if (text)
                            navigator.clipboard.writeText(text);
                    }
                });
            });
        }
    }
    docReady(fn) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(fn, 1);
        }
        else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }
}
new WPEngineHelper();
//# sourceMappingURL=wpengine.js.map