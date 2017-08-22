/**
 * Created by bear on 2017/7/17.
 */
//
const Router = require('koa-router')
const userController = require('./../controllers/userController')

const router =new Router({
    prefix: '/api'
})

router.get('/user/getUserInfo', userController.getUserInfo)
// router.get('/user/isUse', userController.isUse)
router.post('/user/login', userController.login)
router.post('/user/reg', userController.reg)
router.post('/user/getAll', userController.getAll)


module.exports=router
