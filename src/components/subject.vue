<template>
    <div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <foot-nav></foot-nav>
    </div>
</template>
<script>
    import footNav from './footer/footer.vue'
    export default {
        name : 'subject',
        data(){
            return {
                
            }
        },
        components:{
            footNav
        }
    }
</script>