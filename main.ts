class Rose {
    private readonly context: CanvasRenderingContext2D;
    private readonly centerX: number;
    private readonly centerY: number;
    private readonly radius: number;
    private readonly k: number;
    private theta: number = 0;
    private readonly speed: number;
    private previousX: number = 0;
    private previousY: number = 0;

    public constructor(context: CanvasRenderingContext2D, centerX: number, centerY: number,
                       radius: number, k: number, speed: number) {
        this.context = context;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.k = k;
        this.speed = speed;
    }

    public render(): void {
        const x: number = this.centerX +
            (Math.cos(this.k * this.theta) * Math.cos(this.theta) * this.radius);
        const y: number = this.centerY +
            (Math.cos(this.k * this.theta) * Math.sin(this.theta) * this.radius);
        this.context.beginPath();
        this.context.moveTo(x, y);
        if (this.previousX !== 0 && this.previousY !== 0) {
            this.context.lineTo(this.previousX, this.previousY);
        }
        this.context.stroke();
        this.previousX = x;
        this.previousY = y;
        this.theta += this.speed;
    }
}

window.onload = (): void => {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    const width: number = canvas.width = window.innerWidth;
    const height: number = canvas.height = window.innerHeight;

    const gridSizeInPixels: number = Math.min(width, height);
    const numberOfRoses: number = 5;

    const radius: number = (gridSizeInPixels / numberOfRoses) * 0.5 * 0.9;
    const speed: number = 0.1;
    const roses: Rose[] = [];
    for (let n: number = 1; n <= numberOfRoses; n++) {
        for (let d: number = 1; d <= numberOfRoses; d++) {
            const centerX: number = radius + (n - 1) * (gridSizeInPixels / numberOfRoses);
            const centerY: number = radius + (d - 1) * (gridSizeInPixels / numberOfRoses);
            roses.push(new Rose(context, centerX, centerY, radius, n / d, speed));
        }
    }

    function render(): void {
        for (const rose of roses) {
            rose.render();
        }
        requestAnimationFrame(render);
    }
    render();
};
