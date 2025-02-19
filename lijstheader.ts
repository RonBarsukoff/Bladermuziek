namespace Bladermuziek {
    export class LijstHeader extends UIElements.Panel {
        private albumsPanel: UIElements.LabelPanel;
        private auteursPanel: UIElements.LabelPanel;
        private eTitelPanel: UIElements.LabelPanel;
        private bLandscapePanel: UIElements.Panel;
        private bVolledigSchermPanel: UIElements.Panel;
        public albums: UIElements.Selectbox;
        public auteurs: UIElements.Selectbox;
        private eTitel: UIElements.TextInput;
        private bVolledigScherm: UIElements.Button;
        private bLandscape: UIElements.Button;

        public onTitelChanged: textinputChangedCallback | null = null;
        public onVolledigSchermClicked: UIElements.ControlEvent | null = null;
        public onLandscapeClicked: UIElements.ControlEvent | null = null;

        public constructor(aOwner: UIElements.Panel) {
            super(aOwner);
            this.align = 'start';
            this.direction = 'horizontaal';
            this.grootte = 56;
            this.className = 'header';

            this.albumsPanel = this.maakLabelPanel(this, 'Album');
            this.albums = new UIElements.Selectbox(this.albumsPanel.container);
            this.auteursPanel = this.maakLabelPanel(this, 'Auteur');
            this.auteurs = new UIElements.Selectbox(this.auteursPanel.container);
            let myThis = this;

            this.eTitelPanel = this.maakLabelPanel(this, 'Titel');
            this.eTitel = new UIElements.TextInput(this.eTitelPanel.container);
            this.eTitel.oninput = function (e: Event) {
                if (myThis.onTitelChanged)
                    myThis.onTitelChanged(myThis.eTitel);
            }

            this.bLandscapePanel = this.maakKnoppenPanel(this);
            this.bLandscape = new UIElements.Button(this.bLandscapePanel);
            this.bLandscape.className = txtLandscapeClassname;
            this.bLandscape.breedte = 30;
            this.bLandscape.onclick = function (e: Event) { if (myThis.onLandscapeClicked) myThis.onLandscapeClicked(myThis.bLandscape) };

            this.bVolledigSchermPanel = this.maakKnoppenPanel(this);
            this.bVolledigScherm = new UIElements.Button(this.bVolledigSchermPanel);
            this.bVolledigScherm.className = txtVolledigSchermClassname;
            this.bVolledigScherm.breedte = 30;
            this.bVolledigScherm.onclick = function (e: Event) { if (myThis.onVolledigSchermClicked) myThis.onVolledigSchermClicked(myThis.bVolledigScherm) };
        }

        private maakLabelPanel(aOwner: UIElements.Panel, aTekst: string): UIElements.LabelPanel {
            let myPanel = new UIElements.LabelPanel(this, aTekst);
            myPanel.align = 'start';
            myPanel.direction = 'verticaal';
            myPanel.grootte = 220;

            myPanel.label.align = 'start';
            myPanel.label.grootte = 16;
            myPanel.label.className = 'label';

            myPanel.container.align = 'start';
            return myPanel;
        }

        private maakKnoppenPanel(aOwner: UIElements.Panel): UIElements.Panel {
            let myPanel = new UIElements.Panel(aOwner);
            myPanel.align = 'start';
            myPanel.direction = 'verticaal';
            myPanel.grootte = 40;
            return myPanel;
        }

        public async laad() {
            let myResponse = await Data.laadAlbums();
            let myJsonObject = JSON.parse(myResponse);

            let myItems = myJsonObject.items;
            this.albums.clear();
            this.albums.addItems([
                { id: '0', naam: '(geen)' }],
                'id', 'naam')
            this.albums.addItems(myItems, 'id', 'naam');
            this.albums.value = getCookie('GeselecteerdeAlbum');

            myResponse = await Data.laadAuteurs();
            myJsonObject = JSON.parse(myResponse);
            myItems = myJsonObject.items;
            this.auteurs.clear();
            this.auteurs.addItems([
                { id: '0', naam: '(geen)' }],
                'id', 'naam')
            this.auteurs.addItems(myItems, 'id', 'naam');
            this.auteurs.value = getCookie('GeselecteerdeAuteur');  
        }

        public updateKnoppen() {
            if (isInFullScreenMode())
                this.bVolledigScherm.className = txtVensterClassname;
            else
                this.bVolledigScherm.className = txtVolledigSchermClassname;
            this.albums.zetHoogteItems(this.owner.hoogte-100);
        }

        public override herberekenChildren() {
            let myBreedte = this.clientWidth;
            let myPanelBreedte = (myBreedte - this.bLandscapePanel.grootte - this.bVolledigSchermPanel.grootte) / 3;
            myPanelBreedte = Math.min(myPanelBreedte, 400);
            this.albumsPanel.grootte = myPanelBreedte;
            this.albums.breedte = myPanelBreedte-20;
            this.auteursPanel.grootte = myPanelBreedte;
            this.auteurs.breedte = myPanelBreedte - 20;
            this.eTitelPanel.grootte = myPanelBreedte;
            this.eTitel.breedte = myPanelBreedte - 20;
            super.herberekenChildren();

        } 

    }

    interface textinputChangedCallback { (aTextInput: UIElements.TextInput): void }

}

