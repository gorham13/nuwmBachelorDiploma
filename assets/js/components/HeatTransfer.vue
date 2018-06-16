<template>
    <div ref="container" calss="chart-wh" style="height: 80vh; width: 80vw"></div>
</template>


<script>
export default {
    props:['data'],
    data () {
        return {
            dates: [],
            T: [],
            legend: []
        }
    },
    created(){
        let day = 0;
        for(var j = 1; j < this.$parent.heat[0].length - 1; ++j){
            day += this.$parent.dt*1;
            this.dates.push('day ' + day);
            // this.legend.push('day ' + day);
        }
        
        for(var i = 1; i < this.$parent.heat.length; ++i){
            this.T.push([]);
            for(var j = 1; j < this.$parent.heat[i].length - 1; ++j){
                this.T[i - 1].push(this.$parent.heat[i][j]-0.1*i);
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
                    text: 'Heat Transfer'
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
                        type : 'value',
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
        for(var i in this.T)
        {
          tmpArr.push({
            name: i+' m',
            type:'line',
            // smooth: true,
            // stack: 'stack',
            // label: {
            //   normal: {
            //     show: true,
            //   }
            // },
            // areaStyle: {normal: {}},
            data:this.T[i]
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
</style>
