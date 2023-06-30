'use strict';

(document.getElementById('wp-engine-helper-form') as HTMLElement).addEventListener('submit', function(e){
    e.preventDefault();

    chrome.storage.sync.set({ "description": (document.getElementById('description') as HTMLInputElement).value, "emails": (document.getElementById('emails') as HTMLInputElement).value }, function(){
        //  A data saved callback omg so fancy
        (document.getElementById('submit') as HTMLInputElement).disabled = true;
        (document.getElementById('submit') as HTMLInputElement).value = 'Saved';
        setTimeout(() => {
            (document.getElementById('submit') as HTMLInputElement).value = 'Save';
            (document.getElementById('submit') as HTMLInputElement).disabled = false;
        }, 1000);
        (async () => {
            const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
            if(tab.id) {
                await chrome.tabs.sendMessage(tab.id, {action: "updateDefaults"});
                // do something with response here, not outside the function
                // console.log(response);
            }
        })();
    });
});

chrome.storage.sync.get(/* String or Array */["description", "emails"], function(items){
    //  items = [ { "yourBody": "myBody" } ]
    if(items.description)
        (document.getElementById('description') as HTMLInputElement).value = items.description;
    if(items.emails)
        (document.getElementById('emails') as HTMLInputElement).value = items.emails;
});
(document.getElementById("description") as HTMLElement).focus();