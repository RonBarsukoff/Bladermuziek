namespace UIElements {
    export class LabelPanel extends Panel {
        public label: Panel;
        public container: Panel;

        public constructor(aOwner: Panel, aTekst: string) {
            super(aOwner);
            this.label = new UIElements.Panel(this);
            this.label.innerText = aTekst;
            this.container = new UIElements.Panel(this);

        }
    }
}