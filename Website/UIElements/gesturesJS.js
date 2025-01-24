"use strict";
class GestureHandler {
    constructor(aParent) {
        this.mc = new Hammer(aParent.htmlElement());
        this.mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    }
	
    on(aGestureTypes, aFunction) {
		this.mc.on(aGestureTypes, function (ev) {
            const parms = { 
			type: ev.type, 
			centerX: ev.center.x,
			centerY: ev.center.y,
			deltaX: ev.deltaX, 
			deltaY: ev.deltaY };
            aFunction(parms);
		});
    }
}
