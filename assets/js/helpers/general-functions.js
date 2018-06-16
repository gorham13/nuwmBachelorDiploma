export default {
    mu(h, H1, H0){
        let a = 1;
        let ro = 1000;
        let g = 9.8;
        return a*ro*g*(1-2*h/(H1-H0));
    },

    k(H, C, T){
        if(T==0){
            return kch(C, H);
        }
        return (kct(C, T) + kch(C, H))/2;
    },

    nu(C){
        let ro = 1000000;
        return 2.8*10**-5 + C/ro;
    },

    nextAlpha(prevAlpha, a, b, c){
        return b/(c - prevAlpha*a);
    },
    
    nextBeta(prevBeta, alpha, a, c, f){
        return (a*prevBeta + f)/(c - alpha*a);
    },
}

function kct(c, T){
    return kc(c)*kt(T)/k0;
}
function kch(c, h){
    return kc(c) + kh(h);
}

function kc(c){
    return (0.0002*(c**6) - 0.0088*(c**5) + 0.162*(c**4) - 1.3194*(c**3) + 3.9229*(c**2) + 0.0223*c)/Cz + 18.187;
}
function kh(){
    let ro = 1000;
    return 1/(1 + ro**2)
}
function kt(T){
    if(T==0){
        return 0;
    }
    return 0.014151*(T**5) - 0.026097*(T**4) + 0.010819*(T**3) + 0.012844*(T**2) + 0.010404*T + 0.0030925; 
}

let Cz = 350;
let k0 = 1;
