<template>
    <div ref="container" calss="chart-wh" style="height: 80vh; width: 80vw"></div>
</template>


<script>
export default {
    props:['data'],
    data () {
        return {
            dates: [],
            C: [],
            C0: [],
            legend: []
        }
    },
    created(){
        let day = 0;
        for(var j = 1; j < this.$parent.heatMass[0].length - 1; ++j){
            day += this.$parent.dt;
            this.dates.push('day ' + day);
            // this.legend.push('day ' + day);
        }
        
        for(var i = 1; i < 4; ++i){
            this.C.push([]);
            for(var j = 1; j < this.$parent.heatMass[i].length - 1; ++j){
                this.C[i - 1].push(this.$parent.heatMass[i][j]);
            }
        }

        for(var i = 1; i < 4; ++i){
            this.C0.push([]);
            for(var j = 1; j < this.$parent.massWithoutTemp[i].length - 1; ++j){
                this.C0[i - 1].push(this.$parent.massWithoutTemp[i][j]);
            }
        }
    },
    mounted(){
        var dom = this.$refs.container;
        var myChart = echarts.init(dom);
        var app = {};
        var option = null;
            option = {
                title: {
                    text: 'Сomparison Mass Transfer With and Without Temperature'
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
                        data : this.dates
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
            name:'With T',
            type:'line',
            // smooth: true,
            data:this.C[i],
            color: '#404040'
          })
        }
        for(var i in this.C0)
        {
          tmpArr.push({
            name:'Without T',
            type:'line',
            // smooth: true,
            data:this.C0[i],
            color: '#ff4d4d'
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
