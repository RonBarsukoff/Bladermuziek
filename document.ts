namespace Bladermuziek {
    export class Document extends UIElements.Panel {
        private paginas: Pagina[] = [];
        private paginanr = -1; // 0-based
        private stukId: number = -1;
        private aantalPaginasOpscherm: number = 0;

        public menu: DocumentMenu;

        public constructor(aOwner: UIElements.Panel) {
            super(aOwner);
            let myThis = this;
            this.align = 'client';
            this.direction = 'horizontaal';
            this.className = 'document';

            // menu
            this.menu = new DocumentMenu(this);
            this.menu.overlap = true;
            this.menu.visible = false;
            this.menu.onVorigStuk = function (aSender: UIElements.Control) {
                myThis.getStuk(true);
            }
            this.menu.onVolgendStuk = function (aSender: UIElements.Control) {
                myThis.getStuk(false);
            }

            this.gestureOn('swipe tap press', function (e: UIElements.MyGestureEvent) { myThis.handleGesture(e) });
            this.onclick = function (e: MouseEvent) { myThis.handleMouseClick(e) }
        }

        private handleMouseClick(e: MouseEvent) {
            let myX = e.x;
            let myY = e.y;
            if (this.orientatie == 'Landscape') {
                myX = e.y;
                myY = e.x;
            }
            if (myY > this.hoogte - 100)
                this.menu.visible = !this.menu.visible;
            else {
                if (myX < this.breedte / 4)
                    this.bladerPagina(false, true); // 2 paginas terug
                else if (myX < this.breedte / 2)
                    this.bladerPagina(true, false); // 1 pagina vooruit
                else if (myX < 3 * this.breedte / 4)
                    this.bladerPagina(false, false); // 1 pagina achteruit
                else
                    this.bladerPagina(true, true); // 2 paginas vooruit
            }
        }

        private handleGesture(aEvent: UIElements.MyGestureEvent) {
            let myDeltaX = aEvent.deltaX;
            let myDeltaY = aEvent.deltaY;
            let myX = aEvent.centerX;
            if (this.orientatie == 'Landscape') {
                myDeltaX = aEvent.deltaY;
                myDeltaY = - aEvent.deltaX;
                myX = aEvent.centerY
            }
            if (Math.abs(myDeltaY) > Math.abs(myDeltaX)) {
                if (myDeltaY > 0)
                    this.menu.visible = false
                else
                    this.menu.visible = true
            }
            else if ((aEvent.type = 'swipe') && (Math.abs(myDeltaX)) > (Math.abs(myDeltaY))) {
                if (myDeltaX < 0) {
                    if (myX > this.breedte / 2)
                        this.bladerPagina(true, true); // 2 paginas vooruit
                    else
                        this.bladerPagina(true, false); // 1 paginas vooruit
                }
                else {
                    if (myX > this.breedte / 2)
                        this.bladerPagina(false, false); // 1 paginas achteruit
                    else
                        this.bladerPagina(false, true); // 2 paginas achteruit
                }
            }
        }

        private bladerPagina(aVooruit: boolean, aMeerderPaginas: boolean) {
            let myPaginaNr = this.paginanr;
            if ((aVooruit) && (myPaginaNr < this.paginas.length - 1)) {
                if ((aMeerderPaginas) && (myPaginaNr + this.aantalPaginasOpscherm <= this.paginas.length - 1))
                    myPaginaNr += this.aantalPaginasOpscherm
                else
                    myPaginaNr += 1;
            }
            else if ((!aVooruit) && (myPaginaNr > 0)) {
                if ((aMeerderPaginas) && (myPaginaNr - this.aantalPaginasOpscherm >= 0))
                    myPaginaNr -= this.aantalPaginasOpscherm
                else
                    myPaginaNr -= 1;
            }
            if (myPaginaNr != this.paginanr) {
                this.paginanr = myPaginaNr;
                for (let i = 0; i <= this.paginas.length - 1; i++)
                    if (i < this.paginanr)
                        this.paginas[i].visible = false
                    else
                        this.paginas[i].visible = true;
            }
        }

        public async laad(aStukId: number) {
            this.stukId = aStukId;
            let myStuk = await Data.laadStuk(this.stukId);
            this.removePaginas();
            let myPaginas = myStuk.paginas;
            for (let i = 0; i <= myPaginas.length - 1; i++) {
                let myJsonPagina = myPaginas[i];
                let myPagina = new Pagina(this, this.stukId, myJsonPagina.paginanr);
                this.paginas.push(myPagina);
                myPagina.align = 'start';
                myPagina.className = 'pagina';
                myPagina.aspectRatio = myJsonPagina.breedte / myJsonPagina.hoogte;
            }
            this.paginanr = 0;
            this.herberekenChildren();
        }

        private async getStuk(aVorig: boolean) {
            let myStukId = await Data.getVolgendStukIdUitAlbum(this.stukId, aVorig);
            if (myStukId > 0)
                this.laad(myStukId);
        }

        public removePaginas() {
            for (let i = 0; i <= this.paginas.length - 1; i++) {
                this.removePanel(this.paginas[i]);
            }
            this.paginas.length = 0;
        }

        public override herberekenChildren() {
            let myPosite = 0;
            let myBreedte = this.clientWidth;
            let myHoogte = this.clientHeight;

            let myTeBenuttenBreedte = myBreedte;
            this.aantalPaginasOpscherm = 1;
            if (myBreedte > myHoogte) {
                myTeBenuttenBreedte = myBreedte / 2; 
                this.aantalPaginasOpscherm = 2;
            }
            for (let i = 0; i <= this.panels.length - 1; i++) {
                let myPanel = this.panels[i];
                if (myPanel.className == 'menu') {
                    myPanel.top = 0;
                    myPanel.left = 0;
                    myPanel.hoogte = 60;
                    myPanel.breedte = myBreedte;
                }
                else { // pagina
                    if (myPanel.visible) {
                        myPanel.left = myPosite;
                        let myHoogte2 = myHoogte - myPanel.getVertikaleExtraRuimte();
                        let myBreedte2 = myHoogte * myPanel.aspectRatio;
                        if (myBreedte2 > myTeBenuttenBreedte) {
                            myBreedte2 = myTeBenuttenBreedte - myPanel.getHorizontaleExtraRuimte();
                            myHoogte2 = myBreedte2 / myPanel.aspectRatio;
                        }
                        myPanel.hoogte = myHoogte2;
                        myPanel.breedte = myBreedte2;
                        myPosite += myBreedte2 + myPanel.getHorizontaleExtraRuimte();
                    }
                }
            }
            for (let i = 0; i <= this.panels.length - 1; i++) {
                let myPanel = this.panels[i];
                myPanel.herberekenChildren();
            }

            this.menu.top = this.hoogte - this.menu.hoogte;
        }

    }

    interface GestureCallback { (aEvent: UIElements.MyGestureEvent): void }
}
