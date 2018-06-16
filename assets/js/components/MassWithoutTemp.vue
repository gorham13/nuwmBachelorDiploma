<template>
    <div>
        <div class="row justify-content-center">
            <div ref="container" calss="chart-wh" style="height: 80vh; width: 80vw"></div>
        </div>
        <div class="row justify-content-center">
            <table class="table table-sm table-bordered">
                <tbody>
                    <tr>
                        <td>without temp</td>
                        <td>1m</td>
                        <td>2m</td>
                        <td>3m</td>
                        <td>4m</td>
                        <td>5m</td>
                    </tr>
                    <tr v-for="(item, index) in C0">
                        <td>day {{240 + index*30}}</td>
                        <td v-for="subitem in item">{{parseFloat(subitem).toFixed(6)}}</td>
                    </tr><tr><td></td></tr>
                    <tr>
                        <td>with temp</td>
                        <td>1m</td>
                        <td>2m</td>
                        <td>3m</td>
                        <td>4m</td>
                        <td>5m</td>
                    </tr>
                    <tr v-for="(item, index) in C">
                        <td>day {{240 + index*30}}  </td>
                        <td v-for="subitem in item">{{parseFloat(subitem).toFixed(6)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
export default {
    props:['data'],
    data () {
        return {
            h: [],
            C: [],
            C0: [],
            legend: []
        }
    },
    created(){
        for(var i = 1; i < this.$parent.moisture.length; ++i){
            this.h.push(i + 'm');
            this.legend.push(i + 'm');
        }
        for(var i = this.$parent.moisture[0].length-4; i < this.$parent.moisture[0].length - 1; ++i){
            this.C.push([]);
            for(var j = 1; j < this.$parent.moisture.length; ++j){
                this.C[i - (this.$parent.moisture[0].length-4)].push(this.$parent.heatMass[j][i]);
            }
        }
        for(var i = this.$parent.moisture[0].length-4; i < this.$parent.moisture[0].length - 1; ++i){
            this.C0.push([]);
            for(var j = 1; j < this.$parent.moisture.length; ++j){
                this.C0[i - (this.$parent.moisture[0].length-4)].push(this.$parent.massWithoutTemp[j][i]);
            }
        }
        // let day = 0;
        // for(var j = 1; j < this.$parent.heatMass[0].length - 1; ++j){
        //     day += this.$parent.dt*1;
        //     this.dates.push('day ' + day);
        //     // this.legend.push('day ' + day);
        // }
        
        // for(var i = 1; i < 4; ++i){
        //     this.C.push([]);
        //     for(var j = 1; j < this.$parent.heatMass[i].length - 1; ++j){
        //         this.C[i - 1].push(this.$parent.heatMass[i][j]);
        //     }
        // }

        // for(var i = 1; i < 4; ++i){
        //     this.C0.push([]);
        //     for(var j = 1; j < this.$parent.massWithoutTemp[i].length - 1; ++j){
        //         this.C0[i - 1].push(this.$parent.massWithoutTemp[i][j]);
        //     }
        // }
    },
    mounted(){
        var dom = this.$refs.container;
        var myChart = echarts.init(dom);
        var app = {};
        var option = null;
            option = {
                title: {
                    text: 'Comparison Mass Transfer With and Without Temperature'
                },
                tooltip : {
                    trigger: 'axis',
                    
                },
                legend: {
                    data: this.legend
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : this.h
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : this.getChartData()
                    
            };
            ;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
    },
    methods: {
      getChartData(){
        let tmpArr = [];
        for(var i in this.C)
        {
          tmpArr.push({
            name:'With T day ' + (240 + 30*i),
            type:'line',
            // smooth: true,
            data:this.C[i],
            color: '#ff4d4d'
          })
        }
        for(var i in this.C0)
        {
          tmpArr.push({
            name:'Without T day' + (240*1 + 30*i)   ,
            type:'line',
            // smooth: true,
            data:this.C0[i],
            color: '#404040'
          })
        }
        return tmpArr;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.chart-wh{
    height: 900px;
    width: 80vw;
}
</style>
