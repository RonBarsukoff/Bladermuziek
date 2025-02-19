namespace UIElements {
    export abstract class Control extends BasisElement {
        owner: Panel;
        public constructor(aOwner: Panel) {
            super();
            this.owner = aOwner;
        }

        public appendToHtmlElement(aElement: HTMLElement) {
            aElement.appendChild(this.htmlElement());
        }

        get text(): string { return this.innerText };
        set text(aValue: string) { this.innerText = aValue };
    }
    export interface ControlEvent { (aSender: Control): void }
}
