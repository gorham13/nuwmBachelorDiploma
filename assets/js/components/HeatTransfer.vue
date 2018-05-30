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
        for(var i in this.$parent.heat[0]){
            this.dates.push(this.$parent.heat[0][i]);
            this.legend.push('day ' + this.$parent.heat[0][i])
        }
        
        for(var i = 1; i < this.$parent.heat.length; ++i){
            this.T.push([]);
            for(var j = 0; j < this.$parent.heat[i].length; ++j){
                this.T[i - 1].push(this.$parent.heat[i][j]);
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
        for(var i in this.T)
        {
          tmpArr.push({
            name:'name'+i,
            type:'line',
            smooth: true,
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
