// let Mock = require('mockjs')
//
//

// Mock.mock(/\/api\/test/,"get" ,{
//     'myData|10': [{
//         'storeName': '@name',
//         'storeAddress': '@city(true)',
//         'fowllerNum|0-10000': 10,
//         'fowllerFlag|1': true,
//         'img': '@dataImage("450x300", "@name")',
//         'id|+1': 0
//     }]
// })
//
// Mock.mock(/\/api\/getBanner/g, {
//     'myData|5': [{
//         'url': '',
//         'img': '@dataImage("540x260", "@name")',
//         'id|+1': 0
//     }]
// })
//
// Mock.mock(/\/api\/getItemList/g, {
//     "myData|10": [{
//         'title': '@ctitle',
//         'fowllerNum|0-10000': 10,
//         'img': '@dataImage("80x80", "@name")',
//         'time': '@datetime()',
//         'id|+1': 0
//     }],
//     'status|1': true
// })
//
// Mock.mock(/\/api\/postLogin/g, {
//     "myData": {
//         'status|1': true
//     }
// })
// //
// //  /api/seller/apply/provinceList 省份信息接口
//      Mock.mock(/\/api\/seller\/apply\/mainCategoryList/g,{
//
//          "data":{
//                 "a":"23324324"
//
//          }
//     }
// )
//
//  //api/seller/apply/cityList 城市信息
// Mock.mock(/\/api\/seller\/apply\/cityList/g,{
//         "success": true,
//         "errorCode": null,
//         "errorMessage": null,
//         "info": [
//             {
//                 "code": "210100",
//                 "name": "沈阳市",
//                 "provinceCode": "210000"
//             },
//             {
//                 "code": "210200",
//                 "name": "大连市",
//                 "provinceCode": "210000"
//             }
//         ]
//     }
// );
//
// //  /api/seller/apply/sendVerifyCode 手机验证
// Mock.mock(/\/api\/seller\/apply\/sendVerifyCode/g,{
//         "success": true,
//         "errorCode": null,
//         "errorMessage": "发送失败！请重试",
//         "info": true
//     }
// );
//
// //  /api/seller/apply/checkVerifyCode 验证手机验证码
// Mock.mock(/\/api\/seller\/apply\/checkVerifyCode/g,{
//         "success": true,
//         "errorCode": null,
//         "errorMessage": null,
//         "info": true
//     }
// );
//
// //主营类目
// Mock.mock(/\/api\/seller\/apply\/mainCategoryList/g,{
//         "success": true,
//         "errorCode": null,
//         "errorMessage": null,
//         "info": [
//             {
//                 "id": 1,
//                 "name": "电脑、办公",
//                 "status": 1
//             },
//             {
//                 "id": 19,
//                 "name": "男装、女装、内衣鞋靴",
//                 "status": 1
//             }
//         ]
//     }
// );
//
// //商户申请提交
// Mock.mock(/\/api\/seller\/apply\/submit/g,{
//         "success": true,
//         "errorCode": null,
//         "errorMessage": null,
//         "info": true
//     }
// );
//
// ///api/seller/apply/storeTypes [店铺类型
// Mock.mock('/api/seller/apply/storeTypes',{
//         "success": true,
//         "errorCode": null,
//         "errorMessage": null,
//         "info": {
//             "MONOPOLY_STORE": "专卖店",
//             "FRANCHISE_STORE": "专营店",
//             "FLAGSHIP_STORE": "旗舰店"
//         }
//     }
// );

const Koa = require('koa');
const Router = require('koa-router')
let Mock = require('mockjs');
const app =new Koa();
const Random = Mock.Random
const router =new Router();
router.post('/mock', function (req, res, next) {
    // 使用 Mock

    const data = Mock.mock({
        'name|1-5': '*',
        'name2|4': '#',
        'name3|+1': 100,
        'name4|1': true,
        'name5|1-8': true,
        name6: '@bololean()',
        natural: '@natural()'
    });
    // 输出结果
    let ret = JSON.stringify(data, null, 4);

    res.send(ret);
});

router.get('/mockjs', function (req, res, next) {
    // 使用 Mock

    const data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    });
    // 输出结果
    let ret = JSON.stringify(data, null, 4);
    res.send(ret);
});
router.post('/a', function (req, res, next) {

    const data = Mock.mock({
        'myData|10': [{
            'storeName': '@name',
            'storeAddress': '@city(true)',
            'fowllerNum|0-10000': 10,
            'fowllerFlag|1': true,
            'img': '@image("450x300", "@name")',
            'id|+1': 0
        }]
    })
    // 输出结果
    let ret = JSON.stringify(data, null, 4);
    res.send(ret);
})


router.get('/jdapi', function (req, res, next) {
    const cb = req.query.callback;
    // 使用 Mock

    const data = Mock.mock({
        'categories|4-6': [{
            categoryName: '@cname@cname',
            'categoryID|+1': 10,
            logo: '@image(64x64,#eee,Logo)',
            'categoryItems|1-4': [{
                cname: '@cname',
                'cid|+1': 100,
                'item|3-7': [{
                    name: '@cname',
                    'id|+1': 1000,
                    link: '@url'
                }]
            }],
            'seller|8-15': [{
                name: '@cname@cname',
                url: '@url'
            }]
        }]
    });
    let ret = JSON.stringify(data, null, 4);

    ret = cb + '(' + ret + ')';
    res.send(ret);
});
router.get("/home/banner", function (req, res, next) {
    const data = {
        banner: [
            mockUrl + "/b1.jpeg",
            mockUrl + "/b1.jpeg",
            mockUrl + "/b1.jpeg"
        ]
    }
    res.send(data)

});

router.get("/home/grid", function (req, res, next) {
    const data = {
        grid: [
            {
                img: mockUrl + "/shujujiance.png",
                text: "数据监测"
            },
            {
                img: mockUrl + "/anfang.png",
                text: "安全防护"
            },
            {
                img: mockUrl + "/danganguanli.png",
                text: "档案管理"
            },
            {
                img: mockUrl + "/nengxiaobaogao.png",
                text: "能效报告"
            },
            {
                img: mockUrl + "/weixiu.png",
                text: "运维故障"
            },
            {
                img: mockUrl + "/jiaofei.png",
                text: "售电业务"
            },
            {
                img: mockUrl + "/jiaju.png",
                text: "金融服务"
            },
            {
                img: mockUrl + "/add.png",
                text: "更多"
            },
        ]
    }
    res.send(data)

});

router.post("/home/list", function (req, res, next) {

    const data = Mock.mock({
        "news": [
            {
                'title': '能效报告',
                'count|1-10': 2,
                'icon': mockUrl + "/nengxiaobaogao.png",
                'time': '@datetime()',
                'type': 0
            },
            {
                'title': '数据监测',
                'healthy|80-100': 80,
                'todayMax|1000-3000':10001,
                'icon': mockUrl + "/shujujiance.png",
                'time': '@datetime()',
                'type': 1
            },
            {
                'title': '行业动态',
                'city|3':[
                    {
                        name:'@province()',
                        "count":Random.float(1, 0, 3, 5),
                    }
                ],
                'icon': mockUrl + "/news.png",
                'time': '@datetime()',
                'type': 2
            },
            {
                'title': '新闻中心',
                'content': Random.cword('宁夏回族自治区境内的7大火力发电企业集体上书', 8, 14),
                'icon': mockUrl + "/info.png",
                'time': '@datetime()',
                'type': 3
            }
            ],
        'status|1': true
    })
    res.send(data)

});


app.use('/api', router);

app.listen(2000);
