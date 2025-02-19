namespace Bladermuziek {
    export class Pagina extends UIElements.Panel {
        private image: UIElements.Image;

        public constructor(aOwner: UIElements.Panel, aStukId: number, aPaginaNr: number) {
            super(aOwner);
            this.image = new UIElements.Image(this, Data.getImageUrl(aStukId, aPaginaNr));
            this.appendControl(this.image);
        }

        public override herberekenChildren() {
            this.image.breedte = this.breedte;
            this.image.hoogte = this.hoogte;
        }
    }
}
