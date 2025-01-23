namespace UIElements {
    export class TextInput extends Control {
        private inputElement: HTMLInputElement;

        set oninput(aValue: ElementChangeEvent) { this.inputElement.oninput = aValue };
        get value(): string { return this.inputElement.value }

        public constructor(aOwner: Panel) {
            super(aOwner);
            this.inputElement = document.createElement('input');
            this.inputElement.type = 'text';
            this.owner.appendControl(this);
        }

        protected htmlElement() {
            return this.inputElement;
        }

    }
}