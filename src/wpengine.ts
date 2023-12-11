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

    updateDefaultsDisplay(): void {
        const el = document.querySelector("#new_checkpoint");
        if (el) {
            try {
                // @ts-ignore
                browser.storage.sync.get(["description", "emails"]).then(function (items) {
                    if (items) {
                        setTimeout(() => {
                            if (items.description)
                                (document.querySelector('#checkpoint_comment') as HTMLInputElement).value = items.description;
                            if (items.emails)
                                (document.querySelector('#checkpoint_notification_emails') as HTMLInputElement).value = items.emails;
                        }, 500);
                    }
                });
            } catch (e) {
                console.log("error: ", e);
            }
        } else {
            // console.log("Backup page not found");
        }
    }

    setDefaults(): void {
        // @ts-ignore
        browser.storage.sync.set({ description: (document.querySelector('#checkpoint_comment') as HTMLInputElement).value, emails: (document.querySelector('#checkpoint_notification_emails') as HTMLInputElement).value }, function () { });
    }

    addSaveDefaultsButton(): void {
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

    modSFTPPage(): void {
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
                        // parent.style['align-items'] = 'center';
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
                        let text = (parent.querySelector('button') as HTMLButtonElement).textContent;
                        if (text)
                            navigator.clipboard.writeText(text);
                    }
                });
            });
        }
    }

    docReady(fn: any): void {
        // see if DOM is already available
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }
}

new WPEngineHelper();