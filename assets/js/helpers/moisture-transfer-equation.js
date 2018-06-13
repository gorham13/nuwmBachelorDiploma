import generalFunctions from './general-functions'

export default function nextH(H, C, T, i, j, beta, alpha, h, tau) {

    let mu = generalFunctions.mu(h, H[i-1][j+1], H[i-1][j-1]);

    let _L = L(H, C, T, i, j);
    let _a = a(_L, h);
    let _L1 = L1(H, C, T, i, j);
    let _b = b(_L1, h);
    let _c = c(_a, _b, mu, tau);
    
    let _M = M(C, i, j);
    let _M1 = M1(C, i, j);
    
    let _f = f(_M, _M1, mu, H, C, i, j, F(i*h), tau, h);

    beta.moisture = generalFunctions.nextBeta(beta.moisture, alpha.moisture, _a, _c, _f);
    alpha.moisture = generalFunctions.nextAlpha(alpha.moisture, _a, _b, _c);

    return alpha.moisture*H[i][j + 1] + beta.moisture*1;  
    
};

function a(L, h){
    return L/(h*h);
}

function b(L1, h){
    return L1/(h*h);
}

function c(a, b, mu, tau){
    return a + b + mu/tau;
}

function f(M, M1, mu, H, C, i, j, F, tau, h){
    return mu*H[i-1][j]/tau + F + M1*(C[i][j+1]-C[i-1][j])/h + M1*(C[i-1][j]-C[i-1][j-1])/h;
}

function M(C, i, j){
    return 0.5*(generalFunctions.nu(C[i-1][j]) + generalFunctions.nu(C[i-1][j-1]));
}

function M1(C, i, j){
    return 0.5*(generalFunctions.nu(C[i-1][j]) + generalFunctions.nu(C[i][j+1]));
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



let eps = 0.5;
let l = 5;
