class SketchPad {
    constructor(container, size = 400) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color:white;
            box-shadow: 0px 0px 10px 2px black;
        `;
        container.appendChild(this.canvas);

        this.cxt = this.canvas.getContext("2d");

        this.path=[];
        this.isDrawing=false;

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.onmousedown=(evt)=>{
            const mouse = this.#getMouse(evt);
            this.path=[mouse];
            this.isDrawing=true;
        }
        this.canvas.onmousemove=(evt)=>{
            if(this.isDrawing) {
                const mouse = this.#getMouse(evt);
                this.path.push(mouse);
                console.log(this.path.length);
                this.#redraw();
            }
        }
        this.canvas.onmouseup=()=>{
            this.isDrawing=false;
        }
    }

    #redraw() {
        this.cxt.clearRect(0,0,
            this.canvas.width,this.canvas.height);
        //draw.path(this.cxt,this.path);
    }

    #getMouse=(evt)=>{
        const rect=this.canvas.getBoundingClientRect();
        const mouse = [
            Math.round(evt.clientX-rect.left),
            Math.round(evt.clientY-rect.top)
        ];
        return mouse;
    }
}