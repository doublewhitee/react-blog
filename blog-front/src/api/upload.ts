import axios from 'axios';

import { picHostInfo } from '@config/index';

const { owner, repo, message, token } = picHostInfo

export function uploadFile(fileName: string, file: string | ArrayBuffer) {
  return axios({
    method: 'put',
    url: `https://api.github.com/repos/${owner}/${repo}/contents/${fileName}`,
    headers: {
      Authorization: 'Bearer ' + token
    },
    data: {
      owner,
      repo,
      path: fileName,
      message,
      content: file
    }
  })
}