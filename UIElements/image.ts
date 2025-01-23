namespace UIElements {
    export class Image extends Control {
        private imageElement: HTMLImageElement;
        public set breedte(aValue: number) { this.imageElement.width = aValue };
        public set hoogte(aValue: number) { this.imageElement.height = aValue };

        public constructor(aOwner: Panel, aSrc: string) {
            super(aOwner);
            this.imageElement = document.createElement('img');
            this.imageElement.src = aSrc;
            this.owner.appendControl(this);
        }

        protected htmlElement() {
            return this.imageElement;
        }
    }
}