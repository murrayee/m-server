/**
 * Created by bear on 2017/12/2.
 */


module.exports = app => {
    class TopicsService extends app.Service {
        async index() {

            let list=Array.from(new Array(100)).map((v,i)=>({
                author:`我是你哥${i}`,
                avatar: {type: String},
                create_time: {type: Number},
                title: {type: String},
                abstract: {type: String},
                relevant_img: {type: String},
                praise_count: {type: Number},
                review_count: {type: Number},
                read_count: {type: Number},
            }))

            let topics = await this.ctx.model.topics.insert({

            })
            return topics
        }
    }
    return TopicsService
};
