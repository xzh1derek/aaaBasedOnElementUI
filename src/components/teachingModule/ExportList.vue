<template>
  <el-button @click="export2Excel">导出数据</el-button>
</template>

<script>
    export default {
        name: "ExportList",
      data(){
        return{
          list:[
            {
              name:'韩版设计时尚风衣大',
              number:'MPM00112',
              salePrice:'￥999.00',
              stocknums:3423,
              salesnums:3423,
              sharenums:3423,
            },
            {
              name:'韩版设计时尚风衣大',
              number:'MPM00112',
              salePrice:'￥999.00',
              stocknums:3423,
              salesnums:3423,
              sharenums:3423,
            },
          ]
        }
      },
      methods:{
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },
        export2Excel() {
          require.ensure([], () => {
            const { export_json_to_excel } = require('../../vendor/Export2Excel');
            const tHeader = ['商品名称','商品货号','售价','库存','销量','分享',];
            const filterVal = ['name', 'number', 'salePrice', 'stocknums', 'salesnums', 'sharenums', ];
            const list = this.goodsItems;
            const data = this.formatJson(filterVal, this.list);
            export_json_to_excel(tHeader, data, '商品管理列表');
          })
        }
      }
    }
</script>

<style scoped>

</style>
