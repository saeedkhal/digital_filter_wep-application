
let zplane = new Zplane(350, 350);
let ztrans = new ZTransform();
let allPassValues = [];
//Your beautiful D3 code will go here
zplane.plot_axis();
let plt = new Plot(50, 100);
// update plot 
let charts = plt.plot([], [], [], [], [], [], "magnitude response", "phase response", "All Pass Phase Response");
const update_plots = () => {
    plt.destroy();
    let poles = zplane.get_poles();
    let zeros = zplane.get_zeros();
    let allPass = zplane.get_allPass();
    let { magnitude, phase } = ztrans.filter(poles, zeros, allPass); //y-axis
    let freqs = ztrans.frequencies; //x-axis
    charts = plt.plot(freqs, magnitude, freqs, phase, [], [], "frequancy response", "phase response", "All-pass Phase Response");
    update_allPass();
}
const update_allPass = () => {
    // update all pass
    let allPass = zplane.get_allPass();
    let { magnitude, phase } = ztrans.filter([], [], allPass);
    let freqs = ztrans.frequencies //x-axisz
    charts.myChart3.data.labels = freqs;
    charts.myChart3.data.datasets.forEach((dataset) => {
        dataset.data = phase;
    });
    charts.myChart3.update();
}
// const all_pass_check = (ev) => {
//     if(ev.checked) {

//     }
// }
zplane.function_during_drag = update_plots;
zplane.function_during_delete = update_plots;
const add_real = (type) => {
    if (type == zplane.types.nonConjPole) {
        //get value of pole
        let real = parseFloat(document.getElementById("realPole").value);
        let imaginary = parseFloat(document.getElementById("imagPole").value);
        zplane.add_point([real, imaginary], zplane.types.nonConjPole);
    } else {
        let real = parseFloat(document.getElementById("realZero").value);
        let imaginary = parseFloat(document.getElementById("imagZero").value);
        zplane.add_point([real, imaginary], zplane.types.nonConjZero);
    }
    update_plots();
}
/*const add_allPass = () => {
    let value = document.getElementById("allPass").value;
    value = math.complex(value);
    zplane.add_point([value.re, value.im], zplane.types.allPass);
    update_plots();
}*/
add_custom_all_pass = () => {

    let re = parseFloat(document.getElementById("allPassReal").value);
        if (re==1) {
        re=0.99999
    }
    let im = parseFloat(document.getElementById("allPassImag").value);
    zplane.add_point([re, im], zplane.types.allPass);
    //add to our lib
/*    let c = math.complex(re, im);
    var sel = document.getElementById('allPass');
    // create new option element
    var opt = document.createElement('option');
    // create text node to add to option element (opt)
    opt.appendChild(document.createTextNode(c.toString()));
    // set value property of opt
    opt.value = c.toString();*/
    update_plots();
}
const add_conj = (type) => {
    if (type == zplane.types.conjPole) {
        let real = parseFloat(document.getElementById("poleReal").value);
        let imag = parseFloat(document.getElementById("poleImag").value);
        zplane.add_point([real, imag], zplane.types.conjPole);
    } else {
        let real = parseFloat(document.getElementById("zeroReal").value);
        let imag = parseFloat(document.getElementById("zeroImag").value);
        zplane.add_point([real, imag], zplane.types.conjZero);
    }
    update_plots();
}
const delete_poles = () => {
    zplane.delete_poles();
    update_plots();
}
const delete_zeros = () => {
    zplane.delete_zeros();
    update_plots();
}
const delete_all = () => {
    zplane.delete_all();
    update_plots();
}