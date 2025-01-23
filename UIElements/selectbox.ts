namespace UIElements {
    export class Selectbox extends Control {
        private legeWaarde = '(geen)';
        private selectboxElement: HTMLElement;
        private selectedItem: HTMLElement;
        private items: HTMLElement;
        public onOptionChanged: SelectboxChangedEvent | null = null;
        public get value(): string {
            let myWaarde = this.selectedItem.innerText;
            if (myWaarde == this.legeWaarde)
                return '';
            else
                return myWaarde;
        };
        public set value(aValue: string) {
            if (aValue == '')
                this.selectedItem.innerText = this.legeWaarde;
            else
                this.selectedItem.innerText = aValue;
        };

        public constructor(aOwner: Panel) {
            super(aOwner);
            const myThis = this;
            this.selectboxElement = document.createElement('div');
            this.selectboxElement.className = 'custom-select';
            this.selectboxElement.onmouseleave = function (e: MouseEvent) {
                myThis.close();
            }
            this.owner.appendControl(this);
            this.position = 'relative';
            this.selectedItem = document.createElement('div');
            this.selectedItem.className = 'select-selected';
            this.selectedItem.onclick = function (e: MouseEvent) {
                myThis.open();
            }
            this.selectboxElement.appendChild(this.selectedItem);
            this.items = document.createElement('div');
            this.items.className = 'select-items';
            this.selectboxElement.appendChild(this.items);
        }

        protected htmlElement(): HTMLElement {
            return this.selectboxElement;
        }

        public addItems(aItems: any[], aKeyName: string, aValueName: string) {
            const myThis = this;
            for (let i = 0; i <= aItems.length - 1; i++) {
                let myItem = aItems[i];
                let myOptionElement = document.createElement('div');
                myOptionElement.innerText = myItem[aValueName];
                this.items.appendChild(myOptionElement);
                myOptionElement.onclick = function (e: MouseEvent) {
                    myThis.selectItem(myOptionElement.innerText);
                }
            }
        }

        public clear() {
            while (this.items.lastChild)
                this.items.removeChild(this.items.lastChild);
        }

        private close() {
            this.items.style.display = 'none';
            this.selectedItem.classList.remove("select-arrow-active");
        }

        private open() {
            this.items.style.display = 'block';
            this.selectedItem.classList.toggle("select-arrow-active");
        }

        private selectItem(aItem: string) {
            this.value = aItem;
            this.close();
            if (this.onOptionChanged) {
                if (aItem == this.legeWaarde)
                    this.onOptionChanged('');
                else
                    this.onOptionChanged(aItem);
            }
        }
        public zetHoogteItems(aValue: number) {
            this.items.style.height = aValue + 'px';
        }
    }

    export type SelectboxChangedEvent = (aValue: string) => void

}
