async function findFreeIp(netId) {
  const url = `https://ds.smartape.net/api/dci/v3/ipmgr/ip?orderby=name%20asc&limit=0,512&where=NOT%20domain%20CP%20%27%25extended.%25%27+AND+(ipnet%20EQ%20${netId})`;

  const response = await fetch(url, { headers: { 'isp-box-instance': 'true' } });

  if (!response.ok) {
    console.error(`HTTP Error when calling API: ${response.status}`);
    return [];
  }

  const json = await response.json();

  const getNetworkMasks = (number) => 2 ** (32 - number);

  const subnetMask = json.list[0].ipnet_name.split('/')[1];
  const subnetAddress = json.list[0].ipnet_name.split('/')[0];

  const sortedList = json.list.sort((a, b) => parseInt(a.ip_addr.split('.')[3], 10) - parseInt(b.ip_addr.split('.')[3], 10));

  const networkName = subnetAddress.split('.').slice(0, 3).join('.');
  const networkNameNumber = subnetAddress.split('.').slice(3, 4);

  const startNum = parseInt(networkNameNumber, 10) + 1;
  const endNum = parseInt(networkNameNumber, 10) + parseInt(getNetworkMasks(parseInt(subnetMask, 10)), 10);

  const freeIp = [];
  for (let i = startNum; i < endNum; i += 1) {
    freeIp.push(`${networkName}.${i}`);
  }
  return freeIp.filter((el) => !sortedList.map((el2) => el2.ip_addr).includes(el));
}

findFreeIp(window.location.pathname.split('/').slice(4, 5)).then((result) => console.log(result));