class Main {
    public rootPanel: UIElements.RootPanel;
    private startPanel: UIElements.Panel;
    private clientPanel: UIElements.Panel;
    private endPanel: UIElements.Panel;

    public constructor() {
        const myThis = this;
        this.rootPanel = new UIElements.RootPanel();
        this.rootPanel.direction = 'verticaal';
        this.rootPanel.backgroundColor = 'red';

        this.startPanel = new UIElements.Panel(this.rootPanel);
        this.startPanel.direction = 'horizontaal';
        this.startPanel.align = 'start';
        this.startPanel.backgroundColor = 'yellow';
        this.startPanel.grootte = 50;

        this.clientPanel = new UIElements.Panel(this.rootPanel);
        this.clientPanel.direction = 'horizontaal';
        this.clientPanel.align = 'client';
        this.clientPanel.backgroundColor = 'green';
        this.clientPanel.onclick = function (e: MouseEvent) {
            myThis.handleOrientatieClicked();
        }

        this.endPanel = new UIElements.Panel(this.rootPanel);
        this.endPanel.direction = 'horizontaal';
        this.endPanel.align = 'end';
        this.endPanel.backgroundColor = 'blue';
        this.endPanel.grootte = 20;
    }

    private handleOrientatieClicked() {
        if (globalOrientatie == 'Portrait')
            globalOrientatie = 'Landscape';
        else
            globalOrientatie = 'Portrait';
        this.toonAfmetingen();

        if (globalOrientatie == 'Landscape') {
            document.body.style.transform = 'translate(100%, 0px) rotate(90deg)';
            document.body.style.transformOrigin = '0% 0%';
        }
        else {
            document.body.style.transform = 'translate(0%, 0px) rotate(0deg)';
            document.body.style.transformOrigin = '0% 0%';
        }
        this.setSize();
        this.toonAfmetingen();
    }

    private setSize() {
        this.rootPanel.setSize(this.rootPanel.clientWidth, this.rootPanel.clientHeight);
    }

    public init() {
        this.setSize();
    }

    private toonAfmetingen() {
        console.log(`clientWidth: ${this.rootPanel.clientWidth}, clientHeight: ${this.rootPanel.clientHeight}`);
        console.log(`window.innerWidth: ${window.innerWidth}, window.innerHeight: ${window.innerHeight}`);
    }
}