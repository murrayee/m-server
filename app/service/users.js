/**
 * Created by bear on 2017/11/16.
 */
const Service = require('egg').Service;
const pinyin = require('pinyin')

class UsersService extends Service {
    async index() {
        let user = await this.ctx.model.Users.find({}).sort({firstLetter: 1})
        let result = user
        return result
    }

    async authorize(params) {
        let result = await this.ctx.model.Users.find({
            username: params.username,
            password: params.password
        })
        return result
    }
    async profile(params) {
        let result = await this.ctx.model.Users.find({
            _id: params,
        })

        return result
    }

    async register(params) {
        const {baseDir} = this.ctx.app;
        let avatarFileName=this.ctx.helper.createFileName()
        await this.ctx.helper.getAvatar(baseDir,avatarFileName,params.username)

        let result = await this.ctx.model.Users.create({
            username: params.username,
            password: params.password,
            avatar:`http://127.0.0.1:9090/public/avatar/${avatarFileName}.png`,
            firstLetter: this.getNameFirstLetter(params.username) || ''
        })
        return result
    }

    async modify(params) {
        const {userId, field, value} = params
        if (!~['name', 'socketId', 'vibration'].indexOf(field)) {
        }
        if (field === 'name') {
            return await this.ctx.model.Users
                .update(
                    {_id: userId},
                    {$set: {[field]: value, firstLetter: this.getNameFirstLetter(value) || ''}}
                )
        }
        if (field === 'socketId') {
            return await this.ctx.model.Users
                .update({_id: userId}, {$set: {[field]: value, onlineStatus: 'online'}})

        }
        if (field === 'vibration') {
            return await this.ctx.model.Users
                .update({_id: userId}, {$set: {[field]: value}})
        }

    }

    getNameFirstLetter(name) {
        let result = pinyin(name[0]);
        return result[0][0][0].toUpperCase();
    }
}
module.exports = UsersService;