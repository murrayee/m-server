/**
 * Created by bear on 2017/7/17.
 */

const userCode={
    //err
    ERROR_USER_NAME: '用户名格式为6-16位的小写字母，包括(-、_)!',

    ERROR_PASSWORD: '密码长度应该为6-16!',

    ERROR_PASSWORD_CONFORM: '两次密码不一致!',

    ERROR_SYS: '系统错误!',

    FAIL_USER_NAME_IS_EXIST: '用户名已被注册，请重新输入！',

    FAIL_USER_NAME_OR_PASSWORD_ERROR: '用户名或登录密码错误!',

    FAIL_USER_NO_LOGIN: '用户未登录!',

    FAIL_USER_NO_EXIST: '用户不存在!',

    SUCCESS_LOGIN:'登录成功',

    SUCCESS_REG:'注册成功,跳转中...',

    SUCCESS_GETALL:'获取用户列表成功!',
    FAIL_GETALL:'获取用户列表失败！'
}
module.exports= userCode
