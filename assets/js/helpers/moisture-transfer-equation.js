export default function nextH(prevH, alpha, beta) {
    return alpha*prevH + beta;
};

function nextAlpha(prevAlpha){
    return b/(c - alpha*a);
}

function nextBeta(prevBeta, alpha, f){
    return (a*prevBeta + f)/(c - alpha*a);
}

function a(L){
    return L/(h*h);
}

function b(L1){
    return L1/(h*h);
}

function c(a, b, mu){
    return a + b + mu/tau;
}

function f(M, M1, mu, H, Ci1, Ci, Ci0, F){
    return mu*H/tau + M1*(Ci1-Ci)/(h*h) +M1*(Ci-Ci0)/(h*h) + F;
}

function M(){
    return 
}

function mu(h, H1, H0){
    return a*ro*g*(1-2*h/(H1-H0))
}