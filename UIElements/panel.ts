namespace UIElements {
    export class RootPanel extends BasisElement {
        private fLeft: number = 0;
        private fTop: number = 0;
        protected fBreedte: number = 0;
        protected fHoogte: number = 0;
        public updating: boolean = false;
        get left() { return this.fLeft };
        set left(aValue: number) {
            this.fLeft = aValue;
            this.panelElement.style.left = this.fLeft + 'px';
        }

        get top() { return this.fTop };
        set top(aValue: number) {
            this.fTop = aValue;
            this.panelElement.style.top = this.fTop + 'px';
        }

        override get breedte() { return this.fBreedte };
        override set breedte(aValue: number) {
            this.fBreedte = aValue;
        }

        override get hoogte() { return this.fHoogte };
        override set hoogte(aValue: number) {
            this.fHoogte = aValue;
        }

        get clientWidth(): number { if (this.orientatie == 'Portrait') return window.innerWidth; else return window.innerHeight }
        get clientHeight(): number { if (this.orientatie == 'Portrait') return window.innerHeight; else return window.innerWidth }

        public grootte: number = 100;
        public panels: Panel[] = [];
        public controls: Control[] = [];
        public elements: BasisElement[] = [];
        public direction: PanelDirection;
        public aspectRatio: number = 0; // fBreedte / fHoogte
        get orientatie(): VensterOrientatie { return globalOrientatie };

        protected panelElement: HTMLElement;

        public constructor() {
            super();
            this.panelElement = document.body;
            this.direction = 'verticaal';
        }

        protected htmlElement(): HTMLElement {
            return this.panelElement;
        }

        public appendPanel(aPanel: Panel) {
            this.panels.push(aPanel);
            this.panelElement.appendChild(aPanel.panelElement);
        }

        public appendControl(aControl: Control) {
            this.controls.push(aControl);
            //this.panelElement.appendChild(aHtmlElement);
            //            this.panelElement.appendChild(aControl.htmlElement());
            aControl.appendToHtmlElement(this.panelElement);
        }

        public removePanel(aPanel: Panel) {
            const myIndex = this.panels.indexOf(aPanel);
            this.panelElement.removeChild(aPanel.panelElement);
            this.panels.splice(myIndex, 1);
        }

        public removeAllPanels() {
            for (let i = this.panels.length - 1; i >=0 ; i--) 
                this.removePanel(this.panels[i]);
            this.panels.length = 0;
        }

        public herberekenChildren() {
            // eerst alle start panels
            let myPosite = 0;
            for (let i = 0; i <= this.panels.length - 1; i++) {
                const myPanel = this.panels[i];
                if ((myPanel.visible) && (myPanel.align == "start")) {
                    if (this.direction == 'verticaal') {
                        myPanel.panelElement.style.top = myPosite + 'px';
                        myPanel.panelElement.style.left = '0px';
                        myPanel.breedte = (this.clientWidth - myPanel.getHorizontaleExtraRuimte());
                        myPanel.hoogte = myPanel.grootte;
                        if (!myPanel.overlap)
                            myPosite += myPanel.grootte + myPanel.getVertikaleExtraRuimte();
                    }
                    else { // horizontaal
                        myPanel.panelElement.style.left = myPosite + 'px';
                        myPanel.panelElement.style.top = '0px';
                        myPanel.hoogte = this.clientHeight - myPanel.getVertikaleExtraRuimte();
                        myPanel.breedte = myPanel.grootte;
                        if (!myPanel.overlap)
                            myPosite += myPanel.grootte + myPanel.getHorizontaleExtraRuimte();
                    }
                }

            }
            // totale grootte end elementen bepalen
            let myGrootteEndPanels = 0;
            for (let i = 0; i <= this.panels.length - 1; i++) {
                const myPanel = this.panels[i];
                if ((myPanel.visible) && (myPanel.align == 'end') && (!myPanel.overlap))
                    myGrootteEndPanels += myPanel.grootte;
            }
            // grootte client panel zetten. Dit mag er maar 1 zijn
            for (let i = 0; i <= this.panels.length - 1; i++) {
                const myPanel = this.panels[i];
                if (myPanel.visible) {
                    if (myPanel.align == 'client') {
                        if (this.direction == 'verticaal') {
                            myPanel.panelElement.style.top = myPosite + 'px'
                            myPanel.panelElement.style.left = '0px';
                            myPanel.setSize(this.breedte, this.grootte - myPosite - myGrootteEndPanels);
                        }
                        else {
                            myPanel.panelElement.style.left = myPosite + 'px'
                            myPanel.panelElement.style.top = '0px';
                            myPanel.setSize(this.grootte - myPosite - myGrootteEndPanels, this.hoogte);
                        }
                    }
                }
            }
            // tot slot alle end panels
            myPosite = this.grootte - myGrootteEndPanels;
            for (let i = 0; i <= this.panels.length - 1; i++) {
                const myPanel = this.panels[i];
                if ((myPanel.visible) && (myPanel.align == 'end')) {
                    if (this.direction == 'verticaal') {
                        myPanel.panelElement.style.top = myPosite + 'px';
                        myPanel.panelElement.style.left = '0px';
                        myPanel.hoogte = myPanel.grootte;
                        myPanel.breedte = this.breedte;
                    }
                    else {
                        myPanel.panelElement.style.left = myPosite + 'px';
                        myPanel.panelElement.style.top = '0px';
                        myPanel.hoogte = this.hoogte;
                        myPanel.breedte = myPanel.grootte;
                    }
                    if (!myPanel.overlap)
                        myPosite += myPanel.grootte;
                }
            }
 // children van start en end panels herberekenen?
            for (let i = 0; i <= this.panels.length - 1; i++) {
                const myPanel = this.panels[i];
                if ((myPanel.align == 'start') || (myPanel.align == 'end'))
                    myPanel.herberekenChildren();
            }

        }

        public setSize(aWidth: number, aHeight: number) {
            this.breedte = aWidth;
            this.hoogte = aHeight;
            if (this.direction == 'verticaal')
                this.grootte = this.hoogte
            else
                this.grootte = this.breedte;
            this.herberekenChildren();
        }

        public getHorizontaleExtraRuimte() {
            let myResult = 0;
            if (this.className) {
                const myElem = document.querySelector('.' + this.className);
                if (myElem) {
                    const myStyle = getComputedStyle(myElem);
                    myResult +=
                        PixelsNaarInt(myStyle.paddingLeft) + PixelsNaarInt(myStyle.paddingRight) +
                        PixelsNaarInt(myStyle.marginLeft) + PixelsNaarInt(myStyle.marginRight) +
                        2 * PixelsNaarInt(myStyle.borderWidth);
                }
            }
            return myResult;
        }

        public getVertikaleExtraRuimte() {
            let myResult = 0;
            if (this.className) {
                const myElem = document.querySelector('.' + this.className);
                if (myElem) {
                    const myStyle = getComputedStyle(myElem);
                    myResult +=
                        PixelsNaarInt(myStyle.paddingTop) + PixelsNaarInt(myStyle.paddingBottom) +
                        PixelsNaarInt(myStyle.marginTop) + PixelsNaarInt(myStyle.marginBottom) +
                        2 * PixelsNaarInt(myStyle.borderWidth);
                }
            }
            return myResult;
        }
    }

    export class Panel extends RootPanel {
        protected owner: RootPanel;

        public align: PanelAlign = 'client';
        public overlap: boolean = false;

        public constructor(aOwner: RootPanel) {
            super();
            this.panelElement = document.createElement('div');
            this.owner = aOwner;
            this.owner.appendPanel(this);
            this.position = 'absolute';
        }

        protected override herberekenParent() {
            if (!this.owner.updating)
                this.owner.herberekenChildren();
        }
        override set breedte(aValue: number) {
            this.fBreedte = aValue;
            if (this.fBreedte >= 0)
                this.panelElement.style.width = this.fBreedte + 'px';
            else
                console.log('fBreedte is ' + this.fBreedte);
        }
        override get breedte() { return this.fBreedte };
        override set hoogte(aValue: number) {
            this.fHoogte = aValue;
            if (this.fHoogte >= 0)
                this.panelElement.style.height = this.fHoogte + 'px';
            else
                console.log(`this.fHoogte is ${this.fHoogte}`);

            if (this.aspectRatio != 0)
                this.grootte = this.fHoogte * this.aspectRatio;
        }
        override get hoogte() { return this.fHoogte };
        //get clientWidth(): number { if (this.orientatie == 'Portrait') return this.htmlElement().clientWidth; else return this.htmlElement().clientHeight }
        //get clientHeight(): number { if (this.orientatie == 'Portrait') return this.htmlElement().clientHeight; else return this.htmlElement().clientWidth }
        override get clientWidth(): number { return this.htmlElement().clientWidth }
        override get clientHeight(): number { return this.htmlElement().clientHeight }

}


    type PanelDirection = "horizontaal" | "verticaal";
    type PanelAlign = "start" | "client" | "end" | "geen";


    function PixelsNaarInt(aValue: string): number {
        let myResult = 0;
        const myValue = aValue.substring(0, aValue.length - 2);
        if (myValue != '') {
            myResult = Number(myValue);
        }
        return myResult;
    }

}

type VensterOrientatie = 'Portrait' | 'Landscape';

let globalOrientatie: VensterOrientatie = 'Portrait';
