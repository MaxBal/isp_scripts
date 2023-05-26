
const getData  = async (domainName) => {
  const url = `https://dns-01.smartape.ru:1500/manager/dnsmgr?func=domain.filter&name=${domainName}&user=*&dtype=*&sok=ok`;
  const funcUrl = 'https://dns-01.smartape.ru:1500/manager/dnsmgr?clickstat=yes&operafake=1674158538014&p_num=1&sfrom=ajax&func=domain';

  const setFilterResponse = await window.fetch(url, {
    headers: {
      'isp-box-instance': 'true',
    },
  });

  let json = {};

  if (setFilterResponse.ok) {
    const responseShowDomains = await window.fetch(funcUrl, {
      headers: {
        'isp-box-instance': 'true',
      },
    });
    if (responseShowDomains.ok) {
      json = await responseShowDomains.json();
      if (json.content && json.content[0] && json.content[0].name && json.content[0].user) {
        const content = await json.content[0];
        return `${content.name.v} ${content.user.v}`;
      }
    }
  } else {
    console.error(`Ошибка HTTP: ' + ${setFilterResponse.status}`);
  }
  return null;
}

const receiveAll = async (str) => {
  const domains = str.split(',');
  return domains.reduce((promise, domain) => promise.then((result) => getData(domain).then(Array.prototype.concat.bind(result))), Promise.resolve([]));
}

receiveAll('centexkiteboarding.com,houseofmale.com').then((res) => console.error(res));
