const webNotification = require("simple-web-notification");

class NotificationTools{
addNotification(title: string, message: string){
    webNotification.showNotification(title, {
        body: message,
        autoClose: 4000
    }, function onShow(error:any, hide:any) {
        if (error) {
            window.alert('Unable to show notification: ' + error.message);
        } else {
            setTimeout(function hideNotification() {
                hide();
            }, 5000);
        }
    });
}
}

const notificationTools = new NotificationTools()
export default notificationTools;