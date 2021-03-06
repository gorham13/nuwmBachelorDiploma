import moisture from './moisture-transfer-equation'
import heat from './heat-transfer-equation'
import heatMass from './heat-mass-transfer-equation'
import generalFunctions from '../helpers/general-functions'

export default function res(Td, dt, h1, h2, t1, t2, c1, c2, n) {
    let H = [[]];
    let T = [[]];
    let C = [[]];
    let H0 = [[]];
    let T0 = [[]];
    let C0 = [[]];
    // Td*=1; dt*=1; h1*=1; h2*=1; t1*=1; t2*=1; c1*=1; c2*=1; n*=1;
    


    for(var j = 0; j < Td/dt+1; ++j){

        H[0][j] = (h2-h1)/Td*j*dt + h1*1;//h2 - j*dt*(h2 - h1)/Td;//0.02*j;//Math.exp(-3*j*dt);
        if(H[0][j] < 0){
            H[0][j] = 0;
        }
        T[0][j] = (t2-t1)/Td*j*dt + t1*1;//t1*1 - (t1 - t22)*j*dt/Td;
        C[0][j] = (c2-c1)/Td*j*dt + c1*1;//c1*1 - (c1 - c22)*j*dt/Td;
        if(C[0][j] < 0){
            C[0][j] = 0;
        }
        H0[0][j] =  (h2-h1)/Td*j*dt + h1*1;
        if(H0[0][j] < 0){
            H0[0][j] = 0;
        }
        T0[0][j] = 0;//(t2-t1)/Td*j*dt + t1*1;;
        C0[0][j] = (c2-c1)/Td*j*dt + c1*1;
        if(C0[0][j] < 0){
            C0[0][j] = 0;
        }
    }
    let dh = Math.abs(h2 - h1)/n;
    let dt1 = Math.abs(t2 - t1)/n;
    // console.log('t1', t1, 't2', t2, 'dt', dt1);
    let dc = Math.abs(c2 - c1)/n;
    for(var i = 0; i <= n; ++i){
        H.push([]);
        H[i][j - 1] = h2;
        if(H[i][j - 1] < 0){
            H[i][j - 1] = 0;
        }
        H[i][0] = h1;

        T.push([]);
        T[i][j - 1] = t2;
        T[i][0] = t1;

        C.push([]);
        C[i][j - 1] = c2;
        if(C[i][j - 1] < 0){
            C[i][j - 1] = 0;
        }
        C[i][0] = c1;

        H0.push([]);
        H0[i][j - 1] = h2;
        if(H0[i][j - 1] < 0){
            H0[i][j - 1] = 0;
        }
        H0[i][0] = h1;

        T0.push([]);
        T0[i][j - 1] = 0;
        T0[i][0] = 0;

        C0.push([]);
        C0[i][j - 1] = c2;
        if(C0[i][j - 1] < 0){
            C0[i][j - 1] = 0;
        }
        C0[i][0] = c1;
    }
    H.splice(-1,1);
    H0.splice(-1,1);
    T.splice(-1,1);
    C.splice(-1,1);
    C0.splice(-1,1);
    for(var i = 1; i <= n; ++i){
        let alpha = {
            moisture: 0,
            heat: 0,
            heatMass: 0
        }
        // console.log('H', H);
        let beta = {
            moisture: 1,//H[i][0],
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
            moisture: 1,//H[i][0],
            heat: T[i][0],
            heatMass: C[i][0]
        }
        for(var j = H0[i].length - 2; j > 0; --j){
            // console.log(H[0][j]);
            H0[i][j] = moisture(H0, C0, T0, i, j, beta, alpha, dh, dt);
            T0[i][j] = 10**-6;
            C0[i][j] = heatMass(H0, C0, T0, i, j, beta, alpha, dh, dt);
        }
    }
    return {H: H, T: T, C: C, H0: H0, T0: T0, C0: C0};
};

// var eps = 0.5;
// var k0 = 1;
// var T = 360;
// var l = 5;
// var ro = 1000;
// var Cz = 350;
// var T = 3;