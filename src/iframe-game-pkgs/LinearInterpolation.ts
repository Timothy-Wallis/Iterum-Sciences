class Lerp {
    private lerpResult: number;
    private start: number;
    private end: number;
    private percent: number;

    /**
     * 
     * @param start - number: Start value
     * @param end - number: End value
     * @param startPercent - number: Initial percentage (0 to 1) for the interpolation, default is 0.5
     */

    constructor(start: number, end: number, startPercent: number = .5) {
        this.start = start;
        this.end = end;
        this.percent = startPercent;
        this.lerpResult = this.clamp(this.calculateLerp(), this.start, this.end);
    }

    private calculateLerp(): number {
        return this.start + (this.end - this.start) * this.percent;
    }

    /**
     * 
     * @param percent - number: Percentange (0 to 1) for the interpolation
     */
    public changePercent(percent: number): void {
        this.percent = percent;
        this.lerpResult = this.clamp(this.calculateLerp(), this.start, this.end);
    }

    /**
     * @returns number: The current interpolated value
     */
    public get value(): number {
        return this.lerpResult;
    }

    private clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }
}

export default Lerp;
