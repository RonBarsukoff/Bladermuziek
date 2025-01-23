namespace UIElements {
    export class Button extends Control {
        buttonElement: HTMLElement;

        public constructor(aOwner: Panel) {
            super(aOwner);
            this.buttonElement = document.createElement('div');
            this.owner.appendControl(this);
        }

        protected htmlElement() {
            return this.buttonElement;
        }
    }
}
