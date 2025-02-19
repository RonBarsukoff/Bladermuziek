namespace Bladermuziek {
    export class Lijst extends UIElements.Panel {
        public header: LijstHeader;
        public regels: LijstRegels;
        public constructor(aOwner: UIElements.RootPanel) {
            super(aOwner);
            this.direction = 'verticaal';
            this.align = 'client';
            this.className = 'lijst';
            this.header = new LijstHeader(this);
            let myThis = this;
            this.header.albums.onOptionChanged = function (aValue: string) { myThis.handleAlbumChanged(aValue) };
            this.header.auteurs.onOptionChanged = function (aValue: string) { myThis.handleAuteurChanged(aValue) };
            this.header.onTitelChanged = function (aTextInput: UIElements.TextInput) { myThis.handleTitelChanged(aTextInput) };
            this.regels = new LijstRegels(this);
        }

        public async laad() {
            this.header.laad();
            this.regels.laad();
        }

        private handleAlbumChanged(aValue: string) {
            if (aValue == '')
                setCookie('GeselecteerdeAlbum', '')
            else
                setCookie('GeselecteerdeAlbum', aValue);
            this.regels.laad()
        }

        private handleAuteurChanged(aValue: string) {
            if (aValue == '')
                setCookie('GeselecteerdeAuteur', '')
            else
                setCookie('GeselecteerdeAuteur', aValue);
            this.regels.laad()
        }

        private handleTitelChanged(aTextInput: UIElements.TextInput) {
                this.regels.titelFilter(aTextInput.value) 
        }
    }
    class LijstRegels extends UIElements.Panel {
        public onRegelClicked: regelClicked | null = null;
        public constructor(aOwner: UIElements.Panel) {
            super(aOwner);
            this.align = 'client';
            this.className = 'regels';
        }

        public async laad() {
            let myAlbum = getCookie('GeselecteerdeAlbum');
            let myAuteur = getCookie('GeselecteerdeAuteur');
            let myJson = await Data.laadLijst({ auteur: myAuteur, album: myAlbum });
            this.vulLijst(myJson, myAuteur, myAlbum)
        }

        private vulLijst(aJsonString: string, aAuteur: string, aAlbum: string) {
            let myJsonObject = JSON.parse(aJsonString);
            let myThis = this;
            this.removeAllPanels();
            let myItems = myJsonObject.items;
            for (let i = 0; i <= myItems.length - 1; i++) {
                let myItem = myItems[i];
                let myPanel = new LijstRegel(this, myItem.id, myItem.titel, myItem.album, myItem.auteur, myItem.aantalPaginas);
                let myTekst = '<span class="titel">' + myItem.titel + '</span> - ';
                if ((aAuteur == '') && (myItem.auteur))
                    myTekst += '<span class="auteur">' + myItem.auteur + '</span> - ';
                myTekst += '<span class="aantalPaginas">(' + myItem.aantalPaginas + ')</span>';
                if ((aAlbum == '') && (myItem.album))
                    myTekst += '<span class="album"> ' + myItem.album + '</span> '
                myPanel.innerText = myTekst;
                myPanel.onRegelClicked = function (aStukId: number) {
                    if (myThis.onRegelClicked)
                        myThis.onRegelClicked(aStukId);
                }
            }
            this.herberekenChildren();
        }

        public titelFilter(aValue: string) {
            let myRegExp = RegExp(aValue, 'i');
            this.updating = true;
            for (let i = 0; i <= this.panels.length - 1; i++) {
                let myRegel: LijstRegel = this.panels[i] as LijstRegel;
                var p = myRegel.titel.search(myRegExp);
                myRegel.visible = (p >= 0);
            }
            this.updating = false;
            this.herberekenChildren();
        }
    }

    class LijstRegel extends UIElements.Panel {
        public stukId: number;
        public titel: string;
        public album: string;
        public auteur: string;
        public aantalPaginas: number;
        public onRegelClicked: regelClicked | null = null;


        public constructor(aOwner: UIElements.Panel, aStukId: number, aTitel: string, aAlbum: string, aAuteur: string, aAantalPaginas: number) {
            super(aOwner);
            this.stukId = aStukId;
            this.titel = aTitel;
            this.auteur = aAuteur;
            this.album = aAlbum;
            this.aantalPaginas = aAantalPaginas;
            this.align = 'start';
            this.grootte = 32;
            this.direction = 'verticaal';
            this.className = 'regel';
            let myThis = this;
            this.onclick = function (e: MouseEvent) {
                if (myThis.onRegelClicked)
                    myThis.onRegelClicked(myThis.stukId);
            };
        }
    }

    interface regelClicked { (aStukId: number): void } 
}

