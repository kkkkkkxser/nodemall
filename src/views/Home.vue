<template>
    <div>
        <!-- 头部组件 -->
        <nav-header></nav-header>
        <!-- 变化部分路由 -->
        <router-view></router-view>
        <!-- 脚部组件 -->
        <nav-footer></nav-footer>
    </div>
</template>
<script>
// 组件引入
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'
export default {
    data(){
        return{
            
        }
    },
    // 组件注册
    components:{
        NavHeader,
        NavFooter
    }
}
</script>
<style scoped>

</style>