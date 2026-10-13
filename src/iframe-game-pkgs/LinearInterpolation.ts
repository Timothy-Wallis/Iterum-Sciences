class Lerp {
    private lerpResult: number;
    private start: number;
    private end: number;
    private percent: number;

    constructor(start: number, end: number, startPercent: number = 0) {
        this.start = start;
        this.end = end;
        this.percent = this.clamp(startPercent);
        this.lerpResult = this.calculateLerp();
    }

    private calculateLerp(): number {
        return this.start + (this.end - this.start) * this.percent;
    }

    public changePercent(percent: number): void {
        this.percent = this.clamp(percent);
        this.lerpResult = this.calculateLerp();
    }

    public get value(): number {
        return this.lerpResult;
    }

    private clamp(value: number): number {
        return Math.max(0, Math.min(1, value));
    }
}

export default Lerp;
