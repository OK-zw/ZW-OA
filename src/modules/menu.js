const menu_config = [
    {
        title: 'OA系统',
        path: '/',
        children: [
            {
                title: '后台首页',
                path: '/'
            },
            {
                title: '公告信息',
                path: '/board'
            }
        ]
    },
    {
        title: '考勤管理',
        path: '/attend',
        children: [
            {
                title: '我的考勤',
                path: '/mine'
            },
            {
                title: '请假加班',
                path: '/leave-work'
            }
        ]
    }

]


export default menu_config