export const userInfo = {
  username: 'DoubleWhite',
  desc: '我偏要勉强',
  avatar: 'avatar.jpg', // assets
  // 账户：[github, mail, zhihu, twitter, facebook, bilibili, csdn, juejin]
  accounts: [
    {
      icon: 'icon-github',
      url: 'https://github.com/doublewhitee'
    },
    {
      icon: 'icon-csdn',
      url: 'https://blog.csdn.net/doublewhite233'
    },
    {
      icon: 'icon-mail',
      url: 'mailto:2715336213@qq.com'
    }
  ]
}

export const defaultPageTheme = {
  isDarkMode: false,
  theme: 'light-blue'
}

export const secret = [
  "-----BEGIN PUBLIC KEY-----",
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0w036ClSD0LvxPROMun0u022R",
  "OJlZE6P3m+gjq3gpi4n7lo8jhTqMqgccDbVJqnIfMzWS9O3lnlQXWTxJ3B4XJ52F",
  "AcriY5brOXUVgBLx5QMHLLd1gtJnmG4i7r4ytgX7XVKRnojR6zca1YnS0lbGGDF1",
  "CGllB1riNrdksSQP+wIDAQAB",
  "-----END PUBLIC KEY-----"
]

// 采用github仓库存储图片
export const picHostInfo = {
  owner: 'owner', // The account owner of the repository
  repo: 'repo', // The name of the repository
  message: 'add new image', // The commit message
  token: 'your token', // https://github.com/settings/tokens
  baseAddr: 'https://raw.githubusercontent.com/owner/repo/master/'
}
