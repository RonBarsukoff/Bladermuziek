﻿//let VolledigScherm = false;

function isInFullScreenMode(): boolean {
    return (document.fullscreenElement != null);
}
function ToggleFullscreen(aSender: UIElements.Control) {
    if (isInFullScreenMode()) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari 
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { //IE11 
            document.msExitFullscreen();  
        }
        aSender.text = 'Volledig scherm';
    }
    else {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } /* else if (elem.webkitRequestFullscreen) { // Safari 
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE11 
            elem.msRequestFullscreen(); 
        } */
        aSender.text = 'Venster';
    }
    //VolledigScherm = !VolledigScherm;
}

interface Document {
    exitFullscreen: () => Promise<void>;
    //mozCancelFullScreen: () => Promise<void>;
    webkitExitFullscreen: any;
    msExitFullscreen: any;
//    fullscreenElement: any;
//    mozFullScreenElement: any;
//    webkitFullscreenElement: any;
}