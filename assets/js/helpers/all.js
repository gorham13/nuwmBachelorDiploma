import moisture from './moisture-transfer-equation'
import heat from './heat-transfer-equation'
import heatMass from './heat-mass-transfer-equation'

export default function res() {
    let H = [[]];
    let T = [[]];
    let C = [[]];
    for(var j = 0; j < 31; ++j){
        H[0][j] = j;
        T[0][j] = j;
        C[0][j] = j;
    }
    for(var i = 1; i < 6; ++i){
        H.push([]);
        H[i][j - 1] = i/10;
        H[i][0] = i/10;

        T.push([]);
        T[i][j - 1] = i/10;
        T[i][0] = i/10;

        C.push([]);
        C[i][j - 1] = i/10;
        C[i][0] = i/10;
    }
    for(var i = 1; i < 6; ++i){
        let alpha = {
            moisture: 0,
            heat: 0,
            heatMass: 0
        }
        let beta = {
            moisture: H[i][0],
            heat: T[i][0],
            heatMass: C[i][0]
        }
        for(var j = 29; j > 0; --j){
            H[i][j] = moisture(H, C, T, i, j, beta, alpha);
            T[i][j] = heat(H, C, T, i, j, beta, alpha);
            C[i][j] = heatMass(H, C, T, i, j, beta, alpha);
        }
    }
    return {H: H, T: T, C: C};
};

var eps = 0.5;
var k0 = 1;
var T = 360;
var l = 5;
var ro = 1000;
var Cz = 350;
var T = 3;