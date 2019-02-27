/**
 * Created by bear on 2017/11/16.
 */

const axios = require('axios');
const qs = require('qs');
const Service = require('egg').Service;

class DouyinService extends Service {
  constructor(app) {
    super(app);
    this.request = axios.create({
      baseURL: 'https://api.appsign.vip:2688',
      timeout: 10000,
      headers: {
        'User-Agent': 'Aweme/2.8.0 (iPhone; iOS 11.0; Scale/2.00)',
      },
    });
    this.APPINFO = {
      'version_code': '2.7.0',
      'app_version': '2.7.0',
      'channel': 'App%20Stroe',
      'app_name': 'aweme',
      'build_number': '27014',
      'aid': '1128',
    };
    this.params = {
      'version_code': this.APPINFO.version_code,
      'channel': this.APPINFO.channel,
      'app_name': this.APPINFO.app_name,
      'build_number': this.APPINFO.build_number,
      'app_version': this.APPINFO.app_version,
      'aid': this.APPINFO.aid,
      'ac': 'WIFI',
      'count': '8',
      'feed_style': '1',
      'filter_warn': '1',
      'max_cursor': '0',
      'min_cursor': '0',
      'pull_type': '2',
      'type': '1',
      'volume': '0.00',
    };
  }

  async getDevice() {
    const res = await this.request.get('/douyin/device/new/version/2.7.0');
    return res.data.data;

  }

  async getToken() {
    const res = await this.request.get('/token/douyin/version/2.7.0');
    return res.data.token;
  }

  async getSign() {
    const token = await this.getToken();
    const device_info = await this.getDevice();
    this.params = {
      ...this.params,
      'iid': device_info.iid,
      'idfa': device_info.idfa,
      'vid': device_info.vid,
      'device_id': device_info.device_id,
      'openudid': device_info.openudid,
      'device_type': device_info.device_type,
      'os_version': device_info.os_version,
      'os_api': device_info.os_api,
      'screen_width': device_info.screen_width,
      'device_platform': device_info.device_platform,
    };
    const requestData = {
      token: token,
      query: qs.stringify(this.params),
    };
    const res = await this.request.post('/sign', requestData);
    return res.data.data;
  }

  async index() {
    const sign = await this.getSign();
    const feeds = await this.request.get('https://aweme.snssdk.com/aweme/v1/feed/' + '?' + qs.stringify({ ...this.params, ...sign }));
    return { ...feeds.data };
  }

}

module.exports = DouyinService;
