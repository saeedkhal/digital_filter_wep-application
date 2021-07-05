class ZTransform {
    constructor() {
        this.MAX_POINTS = 1000
        this.semiUnitCircle = this.gerate_point_circle();
    }

    get frequencies() {
        return this.theta;
    }

    gerate_point_circle() {
        this.theta = this.linspace(0, Math.PI, this.MAX_POINTS);
        let points = [];
        let x, y;
        for (let i = 0; i < this.MAX_POINTS; i++) {
            x = Math.cos(this.theta[i]);
            y = Math.sin(this.theta[i]);
            points[i] = [x, y]
        }
        return points;
    }

    difference(point1 = [], point2 = []) {
        return [point2[0] - point1[0], point2[1] - point1[1]];
    }

    magnitude(point) {
        return Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
    }

    phase(circle,point) {
            var phase_circle=0;
            var phase_zero=0;

            if (circle[0] == 0) {
                phase_circle= Math.PI / 2;
            }
            if (point[0] == 0) {
                phase_zero= Math.PI / 2;
            }
            else {
                phase_zero=Math.atan(point[1] / point[0]);
                phase_circle=Math.atan(circle[1] / circle[0]);

            }
            return(phase_circle-phase_zero);
        }
        
    phase_all_pass(point) {
        console.log()
        if (point[0] == 0) {
            return Math.PI / 2;
        }
        else {
            return - Math.atan(point[1] / point[0]);
        }
    }




    filter(poles = [[]], zeroes = [[]], allPass = [[]]) {
        let magResponse = []
        let phaseResponse = []
        let magNum, magDenum, phaseNum, phaseDenum, diff;
        for (const point of this.semiUnitCircle) {
            magNum = 1;
            magDenum = 1;
            phaseNum = 0;
            phaseDenum = 0;
            for (const zero of zeroes) {
                diff = this.difference(point, zero);
                magNum = magNum * this.magnitude(diff);
                phaseNum = phaseNum + this.phase(point,zero);

            }
            for (const pole of poles) {

                diff = this.difference(point, pole);
                magDenum = magDenum * this.magnitude(diff);
                phaseDenum = phaseDenum + this.phase(point,pole);
            }
            for (const pass of allPass) {
              diff = this.difference(point, pass);
              phaseNum = phaseNum + this.phase_all_pass([1-point[0]*pass[0] - point[1]*pass[1],point[0]*pass[1] - point[1]*pass[0]]);
              phaseDenum = phaseDenum + this.phase_all_pass(diff);
            }
            magResponse.push((magNum / magDenum).toFixed(5));
            phaseResponse.push(phaseNum - phaseDenum.toFixed(5));
        }
        return {
            "magnitude": magResponse,
            "phase": phaseResponse
        };
    }

    linspace(start, end, num) {
        const step = (end - start) / (num - 1);
        let arr = [];
        for (let i = 0; i < num; i++) {
            arr[i] = (start + (i * step)).toFixed(5);
        }
        return arr;
    }
}