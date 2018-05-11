import generalFunctions from './general-functions'
import Vx from './filtering-speed-equation'

export default function nextT(H, C, T, i, j, beta, alpha) {
    
    let _Vx = Vx(H, C, T, i - 1, j);

    let _a = a(_Vx);
    let _b = b(_Vx);
    let _c = c(_a, _b);

    let _f = f(T, i, j);

    beta.heat = generalFunctions.nextBeta(beta.heat, alpha.heat, _a, _c, _f);
    alpha.heat = generalFunctions.nextAlpha(alpha.heat, _a, _b, _c);

    return alpha.heat*T[i][j + 1] + beta.heat;
};

function a(Vx){
    return fi(Vx)/(h*h) - ksi_minus(Vx)/h;
}

function b(Vx){
    return fi(Vx)/(h*h) + ksi_plus(Vx)/h;
}

function c(a, b){
    return a + b + Cn/(lambda*h);
}

function f(T, i, j){
    return Cn/(lambda*h)*T[i - 1][j];
}

function ksi_minus(Vx){
    return 0.5*(Vx - Math.abs(Vx));
}

function ksi_plus(Vx){
    return 0.5*(Vx + Math.abs(Vx));
}

function ksi(Vx) {
    return ksi_minus(Vx) + ksi_plus(Vx)
}

function fi(Vx){
    return 1/(1 + Cp*h*Vx/(2*lambda));
}

let lambda = 108;
let Cp = 2137;//Cp=4.2*10**6//4.2
let Cn = 4.2;
let h = 0.1;
