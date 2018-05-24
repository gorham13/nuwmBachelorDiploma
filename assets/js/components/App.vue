<template>
    <div class="container">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#moisture">Moisture Tranfer</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#heat">Heat Transfer</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#heat-mass">Heat-Mass Transfer</a>
            </li>
        </ul>
        <div class="tab-content">
            <div id="home" class="container tab-pane active"><br>
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
                <div class="row justify-content-center">
                    <moisture-transfer v-if="moisture.length"></moisture-transfer>
                </div>
                <div class="row justify-content-center">
                    <div class="table-responsive table-bordered">
                        <table class="table-sm">
                            <tr v-for="item in moisture">
                                <td v-for="subitem in item">{{parseFloat(subitem).toFixed(6)}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div id="heat" class="container tab-pane fade"><br>
                <div class="row justify-content-center">
                    <heat-transfer v-if="heat.length"></heat-transfer>
                </div>
                <div class="row justify-content-center">
                    <div class="table-responsive">
                        <table class="table-sm">
                            <tr v-for="item in heat">
                                <td v-for="subitem in item">{{parseFloat(subitem).toFixed(6)}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div id="heat-mass" class="container tab-pane"><br>
                <div class="row justify-content-center">
                    <heat-mass-transfer v-if="heatMass.length"></heat-mass-transfer>
                </div>
                <div class="row justify-content-center">
                    <div class="table-responsive">
                        <table class="table-sm">
                            <tr v-for="item in heatMass">
                                <td v-for="subitem in item">{{parseFloat(subitem).toFixed(6)}}</td>
                            </tr>
                        </table> 
                    </div>   
                </div>
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
                T: 360,
                dt: 30,
                h1: 0.5,
                h2: 1.5,
                t1: 10,
                t2: 5,
                c1: 20,
                c2: 5,
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

                setTimeout(()=>{
                    let _res = res(this.T, this.dt, this.h1, this.h2, this.t1, this.t2, this.c1, this.c2, this.n);

                    this.moisture = _res.H;
                    this.heat = _res.T;
                    this.heatMass = _res.C;
                });
            }
        }
    }
</script>
