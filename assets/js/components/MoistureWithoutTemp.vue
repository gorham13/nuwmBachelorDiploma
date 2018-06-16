<template>
    <div ref="container" calss="chart-wh" style="height: 80vh; width: 80vw"></div>
</template>


<script>
export default {
    props:['data'],
    data () {
        return {
            dates: [],
            H: [],
            H0: [],
            legend: []
        }
    },
    created(){
        let day = 0;
        for(var j = 1; j < this.$parent.moisture[0].length - 1; ++j){
            day += this.$parent.dt*1;
            this.dates.push('day ' + day);
            // this.legend.push('day ' + day);
        }
        
        for(var i = 1; i < 4; ++i){
            this.H.push([]);
            for(var j = 1; j < this.$parent.moisture[i].length - 1; ++j){
                this.H[i - 1].push(this.$parent.moisture[i][j]);
            }
        }

        for(var i = 1; i < 4; ++i){
            this.H0.push([]);
            for(var j = 1; j < this.$parent.moistureWithoutTemp[i].length - 1; ++j){
                this.H0[i - 1].push(this.$parent.moistureWithoutTemp[i][j]);
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
                    text: 'Comparison Moisture Transfer with and without Temperature'
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
        for(var i in this.H)
        {
          tmpArr.push({
            name:'With T',
            type:'line',
            data:this.H[i],
            color: '#ff4d4d'
          })
        }
        for(var i in this.H0)
        {
          tmpArr.push({
            name:'Without T',
            type:'line',
            data:this.H0[i],
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
