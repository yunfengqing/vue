var Home=Vue.component("Home",{
    template:`
    <div>
        <Nav></Nav>
        <div class="homeCon">
        <img class="nav-img" src="http://www.sxuek.com/uploadfile/2017/1116/20171116054843136.jpg" alt="">
        </div>
    </div>
    `
})
var Nav=Vue.component("Nav",{
    template:`
    <ul class="custom-nav">
        <router-link exact v-for="(item,key) in MenuData" :to="item.url" :key="key" tag="li">{{item.title}}</router-link>
        <router-link to="/login" v-if="!islogin" class="log">登录</router-link>
        <span class="info" v-if="islogin" @click="show()">
        {{name}}
        <span class="logout" v-show="isshow" @click="logout()">退出</span>
        </span>
    </ul>
    `,
    data(){
        return{
            MenuData:[
                {title:"首页",url:"/"},
                {title:"简介",url:"/info"},
                {title:"文档",url:"/demo"},
            ],
            islogin:false,
            name:"",
            isshow:false,
        }
    },
    created(){
        this.name=this.get("login","name");
        this.islogin= this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow;
        },
        logout(){
            this.del("login")
            router.push("/")
        }
    }
})
var Info=Vue.component("Info",{
    template:`
    <div class="Info">
        <Nav></Nav>
        <transition  name="opacity" mode="out-in">
        <router-view></router-view>
        </transition >
    </div>`
})
var List=Vue.component("List",{
    template:`
    <div class="List">
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media">
            <router-link tag="a" to="/info/list/1">
                <img class="mui-media-object mui-pull-left" src="">
                <div class="mui-media-body">
                    幸福
                    <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                </div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media">
            <router-link tag="a" to="/info/list/2">
                <img class="mui-media-object mui-pull-left" src="">
                <div class="mui-media-body">
                    木屋
                    <p class='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
                </div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media">
            <router-link tag="a" to="/info/list/3">
                <img class="mui-media-object mui-pull-left" src="">
                <div class="mui-media-body">
                    CBD
                    <p class='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
                </div>
            </router-link>
        </li>
    </ul>
    </div>
    `,
    //组件中进入组件输出
    // beforeRouteEnter(to, from, next){
    //     next(function (vm) {
    //         console.log(vm.get("login","name"));
    //     })
    // },
})
var Con=Vue.component("Con",{
    template:`
    <div style="position:absolute">
        <h1>{{data[$route.params.id-1].title}}</h1>
        <span>{{data[$route.params.id-1].con}}</span>
    </div>
    `,
    data(){
        return{
            data:[
                {title:"111",con:"222"},
                {title:"333",con:"444"},
                {title:"555",con:"666"},
            ]
        }
    }
})
var Demo=Vue.component("Demo",{
    template:`
    <div class="Demo">
        <Nav></Nav>
        
        <router-view name="left" class="left"></router-view>
        <router-view name="right" class="right"></router-view>
        
    </div>
    `,
    beforeRouteEnter(to,from,next){
        //传参mv，不传this指向widow
        next(function (vm) {
            if(!vm.get("login","name")){
                router.push("/login")
            }
        })
    }
})
var left=Vue.component("left",{
    template:`
    <div>
        <ul>
            <li>
                <router-link to="#one">第一</router-link>
                <div class="leftcon">
                    <div>111</div>
                    <div>222</div>
                    <div>333</div>
                </div>
            </li>
            <li>
                <router-link to="#two">第2</router-link>
                <div class="leftcon">
                    <div>111</div>
                    <div>222</div>
                    <div>333</div>
                </div>
            </li>
            <li>
                <router-link to="#three">第3</router-link>
                <div class="leftcon">
                    <div>111</div>
                    <div>222</div>
                    <div>333</div>
                </div>
            </li>
        </ul>
    </div>
    `,
    //同一个组件，路由在更新
    // beforeRouteUpdate(to,from,next){
    //     console.log(1)
    // },
    watch: {
        $route() {
            var hash = this.$route.hash.slice(1);
            var vm = this

            function animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({tweeningNumber: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({tweeningNumber: document.querySelector("#"+hash).offsetTop-50}, 500)
                .onUpdate(function () {
                   document.querySelector(".right").scrollTop = this.tweeningNumber.toFixed(0)
                })
                .start()
            animate()
        }
    }
})
var right=Vue.component("right",{
    template:`
    <div >
        <ul>
            <li id="one" class="rightcon">
                <h1>导航</h1>
                <ul>
                    <li>导航1</li>
                    <li>导航2</li>
                    <li>导航3</li>
                </ul>
            </li>
            <li  id="two" class="rightcon">
                <h1>导航2</h1>
                <ul>
                    <li>导航1</li>
                    <li>导航2</li>
                    <li>导航3</li>
                </ul>
            </li>
            <li  id="three" class="rightcon">
                <h1>导航3</h1>
                <ul>
                    <li>导航1</li>
                    <li>导航2</li>
                    <li>导航3</li>
                </ul>
            </li>
        </ul>
    </div>
    `,

})
var Login=Vue.component("Login",{
    template:`
     <div>
        <header class="mui-bar mui-bar-nav">
        <a @click="back()" class="mui-icon mui-icon-undo"></a>
			<h1 class="mui-title">登录</h1>
		</header>
		<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='login' @click="submit" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
			</div>
			<div class="mui-content-padded oauth-area">

			</div>
		</div>
     </div>
    `,
    methods:{
        back(){
            router.push("/")
        },
        submit(){
            var obj={"name":document.querySelector("#name").value}
            this.save("login",obj);
            router.push("/doc")
        }
    }

})