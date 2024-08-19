import {baseUrl} from "@/utils/env";

//
export const postTopicService = (code) => {
    console.log('Request initiated'); // 添加日志
    console.log(code);
    // 发送 JSON 格式的请求体
    return new Promise(() => {
        uni.request({
            url: baseUrl + '/student/post/topic',
            method: 'POST',
            header: {
                'Content-Type': 'application/json', // 请求头部
                'token': uni.getStorageSync('token')
            },
            success: function (res) {
                // 请求成功的回调
                if (res.statusCode === 200) {
                    console.log('请求成功:', res.data);
                    return res.msg;
                } else {
                    console.error('请求失败，状态码:', res.statusCode);
                }
            },
        });
    })
}
