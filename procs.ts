function setCookie(aName: string, aValue: string) {
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = aName + "=" + aValue + ";" + expires + ";path=/;SameSite=Strict";
}

function getCookie(aName: string) {
    let myName = aName + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(myName) == 0) {
            return c.substring(myName.length, c.length);
        }
    }
    return "";
}