const { parseString } = require('xml2js');

function getUserDataAsync(req) {
  return new Promise(resolve => {
    let xmlData = '';
    req
      .on('data', data => xmlData += data.toString()) // 接收流式数据
      .on('end', () => resolve(xmlData))
  })
}

function parseXMLAsync(xmlData) {
  return new Promise((resolve, reject) => {
    parseString(xmlData, { trim: true }, (err, data) => {
      if (!err) resolve(data);
      else reject('parseXMLAsync failed: ' + err);
    })
  })
}

function formatMessage(jsData) {
  let message = {};
  jsData = jsData.xml;
  if (typeof jsData === 'object' && jsData !== null) {
    for (let key in jsData) {
      let value = jsData[key];
      const filterList = value.filter(item => item !== '');
      if (Array.isArray(value) && filterList.length > 0) {
        message[key] = value[0];
      }
    }
  }
  return message;
}

module.exports = {
  getUserDataAsync,
  parseXMLAsync,
  formatMessage
}