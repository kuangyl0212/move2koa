var React = require('react');
var Link = require('react-router').Link;

class Navi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name:'首页',link:'home'},
                {name:'分类',link:'class'},
                {name:'发表',link:'post'},
                {name:'关于',link:'about'},
                {name:'登录',link:'login'},
                {name:'注册',link:'reg'}
                ]
        }
    }
    clickHandler(event) {
        // console.log('click',event.target.textContent);
        switch (event.target.textContent) {
            case '首页':
                break;
            case '注册':
                break;
        }
    }
    render() {
        // console.log('render-->Navi');
        var navView = [];
        this.state.data.map((item,i)=>{
            // console.log(item);
            navView.push(<div key={i} style={styles.naviItem} onClick={this.clickHandler.bind(this)}>
                <Link style={styles.link} activeStyle={{color: '#099'}} to={item.link}>{item.name}</Link>
            </div>)
        });
        return (
            <div style={styles.placeholder}>
                <nav style={styles.navi}>
                    {navView}
                </nav>
            </div>
        )
    }
}

var naviHeight = '50px';

var styles = {
    placeholder:{
        height: naviHeight,
        width: '100%',
    },
    navi: {
        // background: '#666',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: '6%',
        height: naviHeight,
        // borderBottom: '1px solid #ccc',
        position: 'fixed',
        top: 0,
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 1px 5px #dee1e2',
        backgroundColor: '#fff',
        zIndex: 999999,
    },
    naviItem: {
        lineHeight: naviHeight,
        marginLeft: '3%',
        marginRight: '3%',
    },
    link: {
        textDecoration: 'none',
        fontFamily: 'Microsoft Yahei',
        verticalAlign: 'middle',
        color: '#666',
    },
};

module.exports = Navi;

