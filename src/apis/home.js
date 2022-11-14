// 详情页
export const getDetailsPage = id  => `http://appapi.yndaily.com/api/v2/articles/detail/${id}`
export const getDetailsPage2 = id  => `http://ynhapi.yndaily.com/api/v2/articles/info/${id}`
export const getDetailsPage3 = (id,size)  => `http://appapi.yndaily.com/api/v2/subjects/${id}?udid=7F11F4AC-A318-46D5-AA56-4E6F7C820234&deviceOs=15.7&count=20&clientVersion=4.0.3&pageNum=1&pageNumber=1&pjCode=ynrb&size=${size}&platform=iOS&deviceModel=iPhone%20XS%20Max&pageToken=1&pageNo=1&pageSize=20&platform=iOS&deviceOs=1.0&clientVersionCode=403`

