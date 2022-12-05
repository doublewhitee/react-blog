import { JSEncrypt } from 'jsencrypt';

import { secret } from '../config';

const key = secret.join('')

// RSA 公钥加密
export function setEncrypt (content: string) {
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(key)
  return jsencrypt.encrypt(content) as string
}