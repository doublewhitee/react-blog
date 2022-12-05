import NodeRSA from 'node-rsa'
import config from 'config'

const key = config.secret.join('')

// RSA私钥解密
export function setDecrypt (content) {
  const privateKey = new NodeRSA(key)
  privateKey.setOptions({ encryptionScheme: 'pkcs1' })
  return privateKey.decrypt(content, 'utf8')
}