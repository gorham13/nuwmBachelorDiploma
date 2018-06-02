<template>
    <div ref="container" calss="chart-wh" style="height: 80vh; width: 80vw"></div>
</template>


<script>
export default {
    props:['data'],
    data () {
        return {
            h: [],
            H: [],
            legend: []
        }
    },
    created(){
        for(var i = 1; i < this.$parent.moisture.length; ++i){
            console.log(this.$parent.moisture.length);
            this.h.push(this.$parent.moisture[i][0] + 'm');
            this.legend.push(this.$parent.moisture[i][0] + 'm');
        }
        for(var i = 1; i < this.$parent.moisture[0].length; ++i){
            this.H.push([]);
            for(var j = 1; j < this.$parent.moisture.length; ++j){
                this.H[i - 1].push(this.$parent.moisture[j][i]);
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
                    text: 'Moisture Transfer'
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
        for(var i in this.H)
        {
          tmpArr.push({
            name:'name'+i,
            type:'line',
            // stack: 'stack',
            // label: {
            //   normal: {
            //     show: true,
            //   }
            // },
            // areaStyle: {normal: {}},
            data:this.H[i]
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
