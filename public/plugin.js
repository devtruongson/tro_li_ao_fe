const elementPlugin = document.querySelector("#plugin");
const iconElement = document.createElement("div");
const contentElement = document.createElement("div");
const iframeElement = document.createElement('iframe');


function handleCLickEventIconPluginApp (e) {
    let dataShow = JSON.parse(e.currentTarget.dataset.click_show);
    e.currentTarget.dataset.click_show = true;
    elementPlugin.classList.toggle("show-plugin-content")
    contentElement.classList.toggle("content-show");

    if(!dataShow) {
        contentElement.appendChild(iframeElement);
        iframeElement.src ="http://localhost:3000";
        dataShow = !dataShow;
    }
}

function startPluginApp(){
    iconElement.className= "icon-plugin"
    iconElement.dataset.click_show = false;
    iconElement.addEventListener("click", handleCLickEventIconPluginApp)
    iframeElement.allow="microphone";
    iconElement.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/2885/2885444.png" alt="chat icon" />`

    contentElement.className ="content-chat"
    elementPlugin.appendChild(contentElement);
    elementPlugin.appendChild(iconElement);
} 

if(elementPlugin){
    startPluginApp();
}