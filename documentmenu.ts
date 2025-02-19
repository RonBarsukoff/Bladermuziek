namespace Bladermuziek {
    export class DocumentMenu extends UIElements.Panel {
        private bLaadLijst: UIElements.Button;
        private bVorigStuk: UIElements.Button;
        private bVolgendStuk: UIElements.Button;
        private bVolledigScherm: UIElements.Button;
        private bOrientatie: UIElements.Button;

        public onLaadlijst: UIElements.ControlEvent | null = null;
        public onVorigStuk: UIElements.ControlEvent | null = null;
        public onVolgendStuk: UIElements.ControlEvent | null = null;
        public onVolledigSchermClicked: UIElements.ControlEvent | null = null;
        public onOrientatieClicked: UIElements.ControlEvent | null = null;
        public constructor(aOwner: UIElements.RootPanel) {
            super(aOwner);
            this.align = 'end';
            this.className = 'menu';

            let myThis = this;

            this.bLaadLijst = new UIElements.Button(this);
            this.bLaadLijst.onclick = function (e: MouseEvent) {
                if (myThis.onLaadlijst) {
                    myThis.onLaadlijst(myThis.bLaadLijst);
                    myThis.visible = false;
                }
            }
            this.bLaadLijst.text = 'Lijst';
            this.bLaadLijst.className = 'knop';

            this.bVorigStuk = new UIElements.Button(this);
            this.bVorigStuk.onclick = function (e: MouseEvent) {
                if (myThis.onVorigStuk) {
                    myThis.onVorigStuk(myThis.bVorigStuk);
                    e.stopPropagation();
                }
            }
            this.bVorigStuk.text = 'Vorig stuk';
            this.bVorigStuk.className = 'knop';

            this.bVolgendStuk = new UIElements.Button(this);
            this.bVolgendStuk.onclick = function (e: MouseEvent) {
                if (myThis.onVolgendStuk) {
                    myThis.onVolgendStuk(myThis.bVolgendStuk);
                    e.stopPropagation();
                }
            }
            this.bVolgendStuk.text = 'Volgend stuk';
            this.bVolgendStuk.className = 'knop';

            this.bOrientatie = new UIElements.Button(this);
            this.bOrientatie.onclick = function (e: MouseEvent) {
                if (myThis.onOrientatieClicked)
                    myThis.onOrientatieClicked(myThis.bOrientatie);
                e.stopPropagation();
                myThis.visible = false;
            }
            this.bOrientatie.breedte = 30;
            this.bOrientatie.className = txtLandscapeClassname;


            this.bVolledigScherm = new UIElements.Button(this);
            this.bVolledigScherm.onclick = function (e: MouseEvent) {
                if (myThis.onVolledigSchermClicked)
                    myThis.onVolledigSchermClicked(myThis.bVolledigScherm);
                e.stopPropagation();
                myThis.visible = false;
            }
            this.bVolledigScherm.breedte = 30;
            this.updateKnoppen();
        }

        public updateKnoppen() {
            if (isInFullScreenMode())
                this.bVolledigScherm.className = txtVensterClassname;
            else
                this.bVolledigScherm.className = txtVolledigSchermClassname;
        } 
    }
}

