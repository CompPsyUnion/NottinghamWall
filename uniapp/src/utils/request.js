import {baseUrl} from '@/utils/env'

// 参数： url:请求地址  param：请求参数  method：请求方式 callBack：回调函数
export function request({url='', params={}, method='GET'}) {

    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token: uni.getStorageSync('token')
    }

    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + url,
            data: params,
            header: header,
            method: method,
            success: (res) => {
                const {data} = res
                if (data.code === 200 || data.code === 1) {
                    // store.commit('setLoading', false)
                    console.log('Request Success:', res)
                    resolve(res.data)
                } else {
                    // store.commit('setLoading', true)
                    console.error('Request Failed:', res.data)
                    reject(res.data)
                }
            },
            fail: (err) => {
                console.error('Request Failed:', err);
                const error = {data: {msg: err.data}}
                // store.commit('setLoading', true)
                reject(error)
            }
        });
    })
}

