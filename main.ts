/**
 * Represents a rose, also known as a rhodonea curve, which is a sinusoid expressed by the polar
 * equation `r = cos(k * theta)`.
 */
class Rose {
    private readonly context: CanvasRenderingContext2D;
    private readonly centerX: number;
    private readonly centerY: number;
    private readonly amplitude: number;
    private readonly k: number;
    private theta: number = 0;
    private readonly deltaTheta: number;
    private previousX: number = 0;
    private previousY: number = 0;

    /**
     * @param centerX The x value of the center of the rose.
     * @param centerY The y value of the center of the rose.
     * @param amplitude The length of each petal.
     * @param k The petal coefficient. If `k` is an integer, the curve will be rose-shaped with
     * `2k` petals if `k` is even, and `k` petals if `k` is odd.
     * @param deltaTheta The number of radians that the angle is increased every time the rose is
     * rendered.
     */
    public constructor(context: CanvasRenderingContext2D, centerX: number, centerY: number,
                       amplitude: number, k: number, deltaTheta: number) {
        this.context = context;
        this.centerX = centerX;
        this.centerY = centerY;
        this.amplitude = amplitude;
        this.k = k;
        this.deltaTheta = deltaTheta;
    }

    public render(): void {
        const x: number = this.centerX +
            (Math.cos(this.k * this.theta) * Math.cos(this.theta) * this.amplitude);
        const y: number = this.centerY +
            (Math.cos(this.k * this.theta) * Math.sin(this.theta) * this.amplitude);
        this.context.beginPath();
        this.context.moveTo(x, y);
        if (this.previousX !== 0 && this.previousY !== 0) {
            this.context.lineTo(this.previousX, this.previousY);
        }
        this.context.stroke();
        this.previousX = x;
        this.previousY = y;
        this.theta += this.deltaTheta;
    }
}

window.onload = (): void => {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    const width: number = canvas.width = window.innerWidth;
    const height: number = canvas.height = window.innerHeight;

    const gridSizeInPixels: number = Math.min(width, height);
    const numberOfRoses: number = 5;

    const amplitude: number = (gridSizeInPixels / numberOfRoses) * 0.5 * 0.9;
    const deltaTheta: number = 0.05;
    const roses: Rose[] = [];
    for (let n: number = 1; n <= numberOfRoses; n++) {
        for (let d: number = 1; d <= numberOfRoses; d++) {
            const centerX: number = amplitude + (n - 1) * (gridSizeInPixels / numberOfRoses);
            const centerY: number = amplitude + (d - 1) * (gridSizeInPixels / numberOfRoses);
            roses.push(new Rose(context, centerX, centerY, amplitude, n / d, deltaTheta));
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
