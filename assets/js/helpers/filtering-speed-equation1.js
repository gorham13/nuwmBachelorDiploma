import generalFunctions from '../helpers/general-functions'

export default function filteringSpeed(H, C, T, i, j, h, param = null) {
    let _Ki = Ki(H[i][j], C[i][j], T[i][j], H[i][j-1], C[i][j-1], T[i][j-1]);
    let koefC = Nui(C[i+1][j+1], C[i][j])*(C[i+1][j+1] - C[i][j])/h - 
                Nui(C[i][j], C[i][j-1])*(C[i][j] - C[i][j-1])/h;
    if(param == 'plus'){
        if(j < H[0].length-2){
            koefC = Nui(C[i+1][j+1], C[i][j])*(C[i+1][j+2] - C[i+1][j+1])/h - 
                    Nui(C[i][j], C[i][j-1])*(C[i+1][j+1] - C[i][j])/h;
            // console.log('koefC plus', koefC);
        }
    }else if(param == 'minus'){
        if(j > 1){
            koefC = Nui(C[i][j+1], C[i][j])*(C[i][j] - C[i][j-1])/h - 
                    Nui(C[i][j], C[i][j-1])*(C[i][j-1] - C[i][j-2])/h;
            // console.log('koefC minus', koefC);
        }
    }
    let result = -(_Ki*(H[i+1][j+1] - H[i+1][j])/h - 
                _Ki*(H[i+1][j] - H[i][j-1])/h) + mu2*(T[i+1][j+1] - T[i][j])/h + koefC;
    return result;
}

function Ki(Hi, Ci, Ti, Hi_1, Ci_1, Ti_1){
    return 0.5*(generalFunctions.k(Hi, Ci, Ti) + generalFunctions.k(Hi_1, Ci_1, Ti_1));
}

function Nui(Ci, Ci_1){
    return 0.5*(generalFunctions.nu(Ci) + generalFunctions.nu(Ci_1));
}

let mu2 = 1;
