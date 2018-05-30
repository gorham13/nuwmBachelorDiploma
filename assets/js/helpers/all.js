import moisture from './moisture-transfer-equation'
import heat from './heat-transfer-equation'
import heatMass from './heat-mass-transfer-equation'

export default function res(Td, dt, h1, h2, t1, t2, c1, c2, n) {
    let H = [[]];
    let T = [[]];
    let C = [[]];
    let H0 = [[]];
    let T0 = [[]];
    let C0 = [[]];

    for(var j = 0; j <= Td/dt; ++j){
        H[0][j] = 10**-5//0.02*j;//Math.exp(-3*j*dt);
        T[0][j] = j*dt/45;
        C[0][j] = j*dt/45;
        H0[0][j] = 10**-5//0.02*j;//Math.exp(-3*j*dt);
        T0[0][j] = j*dt/45;
        C0[0][j] = j*dt/45;
    }
    let dh = (h2 - h1)/n;
    let dt1 = (t2 - t1)/n;
    // console.log('t1', t1, 't2', t2, 'dt', dt1);
    let dc = (c2 - c1)/n;
    for(var i = 1; i <= n; ++i){
        H.push([]);
        H[i][j - 1] = h1*1 + i*dh - dt/45;
        H[i][0] = h1*1 + i*dh;

        T.push([]);
        T[i][j - 1] = t1*1 + i*dt1 - dt/45;;
        T[i][0] = t1*1 + i*dt1;

        C.push([]);
        C[i][j - 1] = c1*1 + i*dc - dt/45;;
        C[i][0] = c1*1 + i*dc;

        H0.push([]);
        H0[i][j - 1] = h1*1 + i*dh - dt/45;
        H0[i][0] = h1*1 + i*dh;

        T0.push([]);
        T0[i][j - 1] = t1*1 + i*dt1;
        T0[i][0] = t1*1 + i*dt1;

        C0.push([]);
        C0[i][j - 1] = c1*1 + i*dc;
        C0[i][0] = c1*1 + i*dc;
    }
    for(var i = 1; i <= n; ++i){
        let alpha = {
            moisture: 0,
            heat: 0,
            heatMass: 0
        }
        // console.log('H', H);
        // console.log('H[i][0]', H[i][0]);
        let beta = {
            moisture: H[i][0],
            heat: T[i][0],
            heatMass: C[i][0]
        }
        for(var j = H[i].length - 2; j > 0; --j){
            // console.log(H[0][j]);
            H[i][j] = moisture(H, C, T, i, j, beta, alpha, dh, dt);
            T[i][j] = heat(H, C, T, i, j, beta, alpha, dh);
            C[i][j] = heatMass(H, C, T, i, j, beta, alpha, dh, dt);
        }
    }
    for(var i = 1; i <= n; ++i){
        let alpha = {
            moisture: 0,
            heat: 0,
            heatMass: 0
        }
        // console.log('H', H);
        // console.log('H[i][0]', H[i][0]);
        let beta = {
            moisture: H[i][0],
            heat: T[i][0],
            heatMass: C[i][0]
        }
        for(var j = H0[i].length - 2; j > 0; --j){
            // console.log(H[0][j]);
            H0[i][j] = moisture(H0, C0, T0, i, j, beta, alpha, dh, dt);
            T0[i][j] = 0;
            C0[i][j] = heatMass(H0, C0, T0, i, j, beta, alpha, dh, dt);
        }
    }
    return {H: H, T: T, C: C, H0: H0, T0: T0, C0: C0};
};

var eps = 0.5;
var k0 = 1;
var T = 360;
var l = 5;
var ro = 1000;
var Cz = 350;
var T = 3;