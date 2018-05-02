<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="table-responsive">
                <table class="table-sm">
                    <tr v-bind:key="item[0]" v-for="item in moisture">
                        <td v-bind:key="subitem" v-for="subitem in item">{{subitem}}</td>
                    </tr>
                </table>
            </div>
            <div class="table-responsive">
                <table class="table-sm">
                    <tr v-bind:key="item[0]" v-for="item in heat">
                        <td v-bind:key="subitem" v-for="subitem in item">{{subitem}}</td>
                    </tr>
                </table>
            </div>
            <div class="table-responsive">
                <table class="table-sm">
                    <tr v-bind:key="item[0]" v-for="item in heatMass">
                        <td v-bind:key="subitem" v-for="subitem in item">{{subitem}}</td>
                    </tr>
                </table> 
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
                heatMass: []
            }
        },
        mounted() {
            let _res = res();

            this.moisture = _res.H;
            this.heat = _res.T;
            this.heatMass = _res.C;
        }
    }
</script>
