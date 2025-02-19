namespace UIElements {
    export abstract class BasisElement {
        private isVisible: boolean = true;
        private styleDisplay: string = '';
        private gestureHandler: GestureHandler | null = null;

        protected abstract htmlElement(): HTMLElement;

        public constructor() {
        }

        protected herberekenParent() {
            /* niets */
            console.log('herberekenChildren');
        }

        public gestureOn(aGestureTypes: string, aEventHandler: ElementGestureEvent) {
            if (!this.gestureHandler)
                this.gestureHandler = new GestureHandler(this);
            this.gestureHandler.on(aGestureTypes, aEventHandler);
        }

        get backgroundColor(): string { return this.htmlElement().style.backgroundColor; }
        set backgroundColor(aValue: string) { this.htmlElement().style.backgroundColor = aValue; }

        get color(): string { return this.htmlElement().style.color; }
        set color(aValue: string) { this.htmlElement().style.color = aValue; }

        get overflow(): string { return this.htmlElement().style.overflow; }
        set overflow(aValue: string) { this.htmlElement().style.overflow = aValue; }

        get position(): string { return this.htmlElement().style.position; }
        set position(aValue: string) { this.htmlElement().style.position = aValue; }

        get breedte(): number { return this.htmlElement().clientWidth }
        set breedte(aValue: number) { this.htmlElement().style.width = aValue + 'px'; }

        get hoogte(): number { return this.htmlElement().clientHeight }
        set hoogte(aValue: number) { this.htmlElement().style.height = aValue + 'px'; }

        get innerText(): string { return this.htmlElement().innerHTML; }
        set innerText(aValue: string) { this.htmlElement().innerHTML = aValue; }

        get className(): string { return this.htmlElement().className; }
        set className(aValue: string) { this.htmlElement().className = aValue; }

        //get onclick(): ElementMouseEvent | null { return this.htmlElement().onclick; }
        set onclick(aValue: ElementMouseEvent | null) { this.htmlElement().onclick = aValue; }
        set onmousedown(aValue: ElementMouseEvent | null) { this.htmlElement().onmousedown = aValue; }
        set onmouseup(aValue: ElementMouseEvent | null) { this.htmlElement().onmouseup = aValue; }

        get onchange(): ElementChangeEvent | null { return this.htmlElement().onchange; }
        set onchange(aValue: ElementChangeEvent | null) { this.htmlElement().onchange = aValue; }

        get visible(): boolean { return (this.isVisible) }
        set visible(aValue: boolean) {
            if (aValue != this.isVisible) {
                this.isVisible = aValue;
                if (aValue) {
                    this.htmlElement().style.display = this.styleDisplay;
                }
                else {
                    this.styleDisplay = this.htmlElement().style.display;
                    this.htmlElement().style.display = 'none'
                }
                this.herberekenParent();
            }
        }
    }

    export type ElementMouseEvent = (event: MouseEvent) => void
    export type ElementChangeEvent = (event: Event) => void;
    export type ElementGestureEvent = (event: MyGestureEvent) => void;
    export interface MyGestureEvent extends UIEvent {
        type: string;
        centerX: number;
        centerY: number;
        deltaX: number;
        deltaY: number;
    }
}
