import generalFunctions from './general-functions'

export default function nextH(H, C, T, i, j, beta, alpha) {
    let mu = generalFunctions.mu(h, H[i-1][j+1], H[i-1][j-1]);
    console.log('mu', mu);
    let _L = L(H, C, T, i, j);
    let _a = a(_L);
    let _L1 = L1(H, C, T, i, j);
    let _b = b(_L1);
    let _c = c(_a, _b, mu);
    console.log('_L', _L);
    console.log('_a', _a);
    console.log('_L1',_L1);
    console.log('_b',_b);
    console.log('_c', _c);
    

    let _M = M(C, i, j);
    let _M1 = M1(C, i, j);
    console.log('_M', _M);
    console.log('_M1', _M1);
    let _f = f(_M, _M1, mu, H, C, i, j, F(i*h));
    console.log('_f', _f);

    beta.moisture = generalFunctions.nextBeta(beta.moisture, alpha.moisture, _a, _c, _f);
    alpha.moisture = generalFunctions.nextAlpha(alpha.moisture, _a, _b, _c);
    console.log('beta.moisture', beta.moisture);
    console.log('alpha.moisture', alpha.moisture);
    console.log('H[i][j + 1]', H[i][j + 1]);
    console.log('alpha.moisture*H[i][j + 1] + beta.moisture', alpha.moisture*H[i][j + 1] + beta.moisture);
    return alpha.moisture*H[i][j + 1] + beta.moisture;
    
};

function a(L){
    return L/(h*h);
}

function b(L1){
    return L1/(h*h);
}

function c(a, b, mu){
    return a + b + mu/tau;
}

function f(M, M1, mu, H, C, i, j, F){
    return mu*H[i-1][j]/tau + F;//+ M1*(Ci1-Ci)/(h*h) + M1*(Ci-Ci0)/(h*h) 
}

function M(C, i, j){
    return 0.5*(generalFunctions.nu(C[i-1][j]) + generalFunctions.nu(C[i-1][j-1]));
}

function M1(C, i, j){
    return 0.5*(generalFunctions.nu(C[i-1][j]) + generalFunctions.nu(C[i-1][j+1]));
}

function L(H, C, T, i, j){
    return (generalFunctions.k(H[i-1][j], C[i-1][j], T[i-1][j]) + generalFunctions.k(H[i-1][j-1], C[i-1][j-1], T[i-1][j]));
}

function L1(H, C, T, i, j){
    return (generalFunctions.k(H[i-1][j+1], C[i-1][j+1], T[i-1][j]) + generalFunctions.k(H[i-1][j], C[i-1][j], T[i-1][j]));
}

function F(x){
    return eps*(-x/l + 1);
}



let h = 0.1;
let tau = 1;
let eps = 0.5;
let k0 = 1;
let T = 30;
let l = 5;
let ro = 1000;
let Cz = 350;
