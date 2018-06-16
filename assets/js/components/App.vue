<template>
    <div class="container">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link " data-toggle="tab" href="#home">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#moisture">Moisture Transfer</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#heat">Heat Transfer</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#heat-mass">Heat-Mass Transfer</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#moisture-without-temp">Moisture Compare</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#mass-without-temp">Mass Compare</a>
            </li>
        </ul>
        <div class="tab-content">
            <div id="home" class="container tab-pane"><br>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="T">T (Period Of Time):</label>
                            <input type="number" class="form-control" id="T" v-model="T">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="dt">dt:</label>
                            <input type="number" class="form-control" id="dt" v-model="dt">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="h1">h1:</label>
                            <input type="number" class="form-control" id="h1" v-model="h1">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="h2">h2:</label>
                            <input type="number" class="form-control" id="h2" v-model="h2">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="t1">t1:</label>
                            <input type="number" class="form-control" id="t1" v-model="t1">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="t2">t2:</label>
                            <input type="number" class="form-control" id="t2" v-model="t2">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="c1">c1:</label>
                            <input type="number" class="form-control" id="c1" v-model="c1">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="c2">c2:</label>
                            <input type="number" class="form-control" id="c2" v-model="c2">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="n">n:</label>
                            <input type="number" class="form-control" id="n" v-model="n">
                        </div>
                    </div>
                    <div class="col-6">
                        <button class="btn" @click="calculation">Calculation</button>
                    </div>
                </div>
            </div>
            <div id="moisture" class="container tab-pane fade"><br>
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#with-date">By Days</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#with-depth">By Depth</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div id="with-date" class="container tab-pane active"><br>
                        <div class="row justify-content-center">
                            <moisture-transfer v-if="moisture.length"></moisture-transfer>
                        </div>
                    </div>
                    <div id="with-depth" class="container tab-pane fade"><br>
                        <div class="row justify-content-center">
                            <moisture-transfer1 v-if="moisture.length"></moisture-transfer1>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <table class="table table-sm table-bordered">
                        <tbody>
                            <tr v-for="item in moisture">
                                <td v-for="subitem in item">{{parseFloat(subitem).toFixed(6)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="heat" class="container tab-pane fade"><br>
                <div class="row justify-content-center">
                    <heat-transfer v-if="heat.length"></heat-transfer>
                </div>
                <div class="row justify-content-center">
                    <table class="table table-sm table-bordered">
                        <tbody>
                            <tr v-for="item in heat">
                                <td v-for="subitem in item">{{parseFloat(subitem).toFixed(6)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="heat-mass" class="container tab-pane fade"><br>
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#with-date1">By Days</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#with-depth1">By Depth</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div id="with-date1" class="container tab-pane active"><br>
                        <div class="row justify-content-center">
                            <heat-mass-transfer v-if="heatMass.length"></heat-mass-transfer>
                        </div>
                    </div>
                    <div id="with-depth1" class="container tab-pane fade"><br>
                        <div class="row justify-content-center">
                            <heat-mass-transfer1 v-if="heatMass.length"></heat-mass-transfer1>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <table class="table table-sm table-bordered">
                        <tbody>
                            <tr v-for="item in heatMass">
                                <td v-for="subitem in item">{{parseFloat(subitem).toFixed(6)}}</td>
                            </tr>
                        </tbody>
                    </table> 
                </div>
            </div>
            <div id="moisture-without-temp" class="container tab-pane active"><br>
                <div class="row justify-content-center">
                    <moisture-without-temp v-if="moistureWithoutTemp.length"></moisture-without-temp>
                </div>
                <!-- <div class="row justify-content-center">
                    <table class="table table-sm table-bordered">
                        <tbody>
                            <tr><td>without temp</td></tr>
                            <tr v-for="item in 5">
                                <td v-for="subitem in moistureWithoutTemp[item]">{{parseFloat(subitem).toFixed(6)}}</td>
                            </tr>
                            <tr><td>with temp</td></tr>
                            <tr v-for="item in 5">
                                <td v-for="subitem in moisture[item]">{{parseFloat(subitem).toFixed(6)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
            </div>
            <div id="mass-without-temp" class="container tab-pane fade"><br>
                <mass-without-temp v-if="massWithoutTemp.length"></mass-without-temp>
            </div>
        </div>
    </div>
</template>

<script>
    import res from '../helpers/all'
    export default {
        data(){
            return {
                moisture: [],
                heat: [],
                heatMass: [],
                moistureWithoutTemp: [],
                massWithoutTemp: [],
                T: 360,
                dt: 30,
                h1: 6,
                h2: 1,
                t1: 16,
                t2: 5,
                c1: 6,
                c2: 3,
                n: 5,
            }
        },
        mounted() {
            this.calculation();
        },
        methods: {
            calculation(){
                this.moisture = [];
                this.heat = [];
                this.heatMass = [];
                this.moistureWithoutTemp = [];
                this.massWithoutTemp = [];

                setTimeout(()=>{
                    let _res = res(this.T, this.dt, this.h1, this.h2, this.t1, this.t2, this.c1, this.c2, this.n);
                    this.moisture = _res.H;
                    this.heat = _res.T;
                    this.heatMass = _res.C;
                    _res = res(this.T, this.dt, this.h1, this.h2, 0, 0, this.c1, this.c2, this.n);
                    this.moistureWithoutTemp = _res.H;
                    this.massWithoutTemp = _res.C;
                });
            }
        }
    }
</script>
