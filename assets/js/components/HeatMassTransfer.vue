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
            legend: []
        }
    },
    created(){
        let day = 0;
        for(var j = 1; j < this.$parent.heatMass[0].length; ++j){
            day += this.$parent.dt;
            this.dates.push('day ' + day);
            // this.legend.push('day ' + day);
        }
        
        for(var i = 1; i < this.$parent.heatMass.length; ++i){
            this.C.push([]);
            for(var j = 1; j < this.$parent.heatMass[i].length; ++j){
                this.C[i - 1].push(this.$parent.heatMass[i][j]);
            }
        }
    },
    mounted(){
        var dom = this.$refs.container;
        var myChart = echarts.init(dom);
        var app = {};
        var option = null;
            option = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                },
                title: {
                    text: 'Heat-Mass Transfer'
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
            name:'name'+i,
            type:'line',
            // smooth: true,
            // stack: 'stack',
            // label: {
            //   normal: {
            //     show: true,
            //   }
            // },
            // areaStyle: {normal: {}},
            data:this.C[i]
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
