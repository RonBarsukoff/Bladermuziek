namespace UIElements {
    export class Image extends Control {
        private imageElement: HTMLImageElement;
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