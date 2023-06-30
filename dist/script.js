'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.getElementById('wp-engine-helper-form').addEventListener('submit', function (e) {
    e.preventDefault();
    chrome.storage.sync.set({ "description": document.getElementById('description').value, "emails": document.getElementById('emails').value }, function () {
        document.getElementById('submit').disabled = true;
        document.getElementById('submit').value = 'Saved';
        setTimeout(() => {
            document.getElementById('submit').value = 'Save';
            document.getElementById('submit').disabled = false;
        }, 1000);
        (() => __awaiter(this, void 0, void 0, function* () {
            const [tab] = yield chrome.tabs.query({ active: true, lastFocusedWindow: true });
            if (tab.id) {
                yield chrome.tabs.sendMessage(tab.id, { action: "updateDefaults" });
            }
        }))();
    });
});
chrome.storage.sync.get(["description", "emails"], function (items) {
    if (items.description)
        document.getElementById('description').value = items.description;
    if (items.emails)
        document.getElementById('emails').value = items.emails;
});
document.getElementById("description").focus();
//# sourceMappingURL=script.js.map