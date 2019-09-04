// 引入路由组件
import MSite from '../pages/MSite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue';
import UserInfo from '../pages/UserInfo/UserInfo.vue';
import Shops from '../pages/Shops/Shops.vue';
import Goods from '../pages/Shops/Goods/Goods.vue';
import Ratings from '../pages/Shops/Ratings/Ratings.vue';
import ShopInfo from '../pages/Shops/ShopInfo/ShopInfo.vue';

export default [{
    path: '/msite',
    component: MSite,
    meta: {
      isShow: true
    }
  },
  {
    path: '/shops',
    component: Shops,
    children: [
      {
        path: '/shops/goods',
        component: Goods,
      },
      {
        path: '/shops/ratings',
        component: Ratings,
      },
      {
        path: '/shops/shopinfo',
        component: ShopInfo,
      },
      {
        path: '/shops',
        redirect: '/shops/goods'
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShow: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShow: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShow: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/userinfo',
    component: UserInfo
  },
  {
    path: '/',
    redirect: '/msite'
  }
]