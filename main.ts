namespace Bladermuziek {
    export class Main {
        private rootPanel: UIElements.RootPanel;
        private document: Document;
        private lijst: Lijst;
        private statusbalk: UIElements.Panel;
        public orientatie: VensterOrientatie = 'Portrait';

        public constructor() {
            let myThis = this;
            this.rootPanel = new UIElements.RootPanel();
            this.rootPanel.direction = 'verticaal';

            // hoofdpanel
            let myHoofdPanel = new UIElements.Panel(this.rootPanel);
            myHoofdPanel.align = 'client';
            myHoofdPanel.direction = 'horizontaal';

            let myPanel = new UIElements.Panel(myHoofdPanel);
            myPanel.align = 'client';
            myPanel.overflow = 'hidden';

            this.lijst = new Lijst(myPanel);
            this.lijst.regels.onRegelClicked = function (aStukId: number) {
                myThis.handleRegelClicked(aStukId);
            }
            this.lijst.header.onVolledigSchermClicked = function (aSender: UIElements.Control) { myThis.handleVolledigScherm(aSender) };
            this.lijst.header.onLandscapeClicked = function (aSender: UIElements.Control) { myThis.handleLandscape(aSender) };
            
            this.document = new Document(myPanel);
            this.document.menu.onLaadlijst = function (aSender: UIElements.Control) { myThis.laadLijst() };
            this.document.menu.onVolledigSchermClicked = function (aSender: UIElements.Control) { myThis.handleVolledigScherm(aSender) }
            this.document.menu.onOrientatieClicked = function (aSender: UIElements.Control) { myThis.handleLandscape(aSender) };

            this.statusbalk = new UIElements.Panel(this.rootPanel);
            this.statusbalk.align = "end";
            this.statusbalk.grootte = 26;
            this.statusbalk.innerText = 'Statusbalk';
            this.statusbalk.className = 'statusbalk';

            window.addEventListener('resize', function (event) {
                myThis.setSize();
            });
            this.setSize();

            this.statusbalk.visible = false;
        }

        private setSize() {
            this.rootPanel.setSize(this.rootPanel.clientWidth, this.rootPanel.clientHeight);
            this.document.menu.updateKnoppen();
            this.lijst.header.updateKnoppen();
        }

        private laadLijst() {
            this.document.visible = false;
            this.lijst.visible = true;
            this.lijst.header.laad();
            this.lijst.regels.laad();
        }

        public init() {
            this.laadLijst();
        }

        private handleRegelClicked(aStukId: number) {
            this.document.visible = true;
            this.lijst.visible = false;
            this.document.laad(aStukId);
            this.document.menu.visible = false;
        }

        private handleVolledigScherm(aSender: UIElements.Control) {
            ToggleFullscreen(aSender);
        }

        private handleLandscape(aSender: UIElements.Control) {
            if (this.orientatie == 'Landscape') {
                this.orientatie = 'Portrait';
                aSender.className = txtLandscapeClassname;
            }
            else {
                this.orientatie = 'Landscape';
                aSender.className = txtPortraitClassname;
            }
            if (this.orientatie == 'Landscape') {
                document.body.style.transform = 'translate(100%, 0px) rotate(90deg)';
                document.body.style.transformOrigin = '0% 0%';
            }
            else {
                document.body.style.transform = 'translate(0%, 0px) rotate(0deg)';
                document.body.style.transformOrigin = '0% 0%';
            }
            //this.document.orientatie = this.orientatie;
            globalOrientatie = this.orientatie;
            this.rootPanel.setSize(this.rootPanel.clientWidth, this.rootPanel.clientHeight);
        }
    }

    export const txtPortraitClassname = 'portrait';
    export const txtLandscapeClassname = 'landscape';
}