module.exports = {
  data: [
    {
      name:'首页',
      link:'home',
      img: '/images/home.png'
    },
    {
      name:'发表',
      link:'post'
    },
    {
      name:'用户中心',
      link:'profile'
    },
  ],
  getIconName:(link) => {
    switch(link) {
      case 'home':
        return 'home';
      case 'post':
        return 'edit';
      case 'profile':
        return 'user';
    }
  }
}