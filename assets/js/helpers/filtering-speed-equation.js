import generalFunctions from '../helpers/general-functions'

export default function filteringSpeed(H, C, T, i, j, h) {
    let _Ki = Ki(H[i+1][j], C[i][j], T[i][j], H[i][j-1], C[i][j-1], T[i][j-1]);

    //let Nui = Nui(Ci, Ci_1);
    return _Ki*(H[i+1][j+1] - H[i+1][j])/h - 
             _Ki*(H[i+1][j] - H[i][j-1])/h - mu2*(T[i+1][j+1] - 
             T[i][j])/h - Nui(C[i][j], C[i][j-1])*(C[i+1][j+1] - C[i][j])/h - Nui(C[i][j], C[i][j-1])*(C[i][j] - C[i][j-1])/h
}

function Ki(Hi, Ci, Ti, Hi_1, Ci_1, Ti_1){
    return 0.5*(generalFunctions.k(Hi, Ci, Ti) + generalFunctions.k(Hi_1, Ci_1, Ti_1));
}

function Nui(Ci, Ci_1){
    return 0.5*(generalFunctions.nu(Ci) + generalFunctions.nu(Ci_1));
}

let mu2 = 1;
let h = 0.1;