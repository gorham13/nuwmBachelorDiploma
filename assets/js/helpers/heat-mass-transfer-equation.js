import generalFunctions from './general-functions'
import Vx from './filtering-speed-equation'

export default function nextC(H, C, T, i, j, beta, alpha) {
    let _Vx = Vx(H, C, T, i - 1, j);
    let _d_i = d_i(C, T, H, i, j);
    let _d_i1 = d_i1(C, T, H, i, j);

    let _a = a(_Vx, _d_i);
    let _b = b(_Vx, _d_i1);
    let _c = c(_a, _b);

    let _f = f(C, T, i, j);

    beta.heatMass = generalFunctions.nextBeta(beta.heatMass, alpha.heatMass, _a, _c, _f);
    alpha.heatMass = generalFunctions.nextAlpha(alpha.heatMass, _a, _b, _c);

    return alpha.heatMass*C[i][j + 1] + beta.heatMass;
};

function a(Vx, d_i){
    return eta_i(Vx, d_i)*d_i/(h*h) - r_minus(Vx)/h;
}

function b(Vx, d_i1){
    return eta_2i(Vx, d_i1)*d_i1/(h*h) + r_plus(Vx)/h;
}

function c(a, b){
    return a + b + Cn/(lambda*h);
}

function f(C, T, i, j){
    return sigma/tau*C[i-1][j] + gamma*Cz + Dt*(/*T[i][j-1]*/ - 2*T[i][j] + T[i][j+1])/(h*h);
}

function r_minus(Vx){
    return 0.5*(Vx - Math.abs(Vx));
}

function r_plus(Vx){
    return 0.5*(Vx + Math.abs(Vx));
}

function r(Vx) {
    return r_minus(Vx) + r_plus(Vx)
}

function eta_i(Vx, d_i){
    return 1/(1 + h*r(Vx)/(2*d_i));
}

function eta_2i(Vx, d_i1){
    return 1/(1 + h*r(Vx)/(2*d_i1));
}

function D(Vx){
    let lambda = 1;
    let Dm = 10**-6;
    return (Dm + lambda*Math.abs(Vx))?Vx:0;
}

function d_i(C, T, H, i, j){
    return 0.5*(D(Vx(H, C, T, i - 1, j)) + D(Vx(H, C, T, i - 1, j - 1)));
}

function d_i1(C, T, H, i, j){
    return 0.5*(D(Vx(H, C, T, i - 1, j + 1)) + D(Vx(H, C, T, i - 1, j)));
}

let gamma = 0.0065;
let sigma = 0.4;
let tau = 1;
let h = 0.1;
let lambda = 108;
// let Cp = 2137;//Cp=4.2*10**6//4.2
let Cn = 4.2;//Cn=3*10**6
let Cz = 350;
let Dt = 0.002;

