// UI url example https://ds.smartape.net/dci/devices/switch/18/ports
// {reqUrl}: https://ds.smartape.net/api/dci/v3/switch/18/port?orderby=id%20desc&limit=0,1000

const ports = ""; //input here resp from {reqUrl}

const sortList = (a, b) => {
  const aInt = parseInt(a.description.split('/')[2], 10);
  const bInt = parseInt(b.description.split('/')[2], 10);
  return aInt - bInt;
};

const filterBySwith = (string, portsObj) => portsObj.filter((el) => el.description.split('/')[0] === string);

const getSortedListBySwitchName = (string, portsObj) => filterBySwith(string, portsObj.list).sort(sortList);

const gig1List = () => getSortedListBySwitchName('GigabitEthernet1', ports);
const gig2List = () => getSortedListBySwitchName('GigabitEthernet2', ports);
const fastE0List = () => getSortedListBySwitchName('FastEthernet0', ports);
const fastE1List = () => getSortedListBySwitchName('FastEthernet1', ports);

const getStringList = (list) => list.map((port) => {
  const description = port.description;
  const server = port.server ? port.server.name : '';
  return `${description}\t${server}`;
}).join('\r');

// Uncomment the following

// console.log(getStringList(gig2List()));
// console.log(getStringList(gig1List()));
// console.log(fastE0List(gig2List()));
// console.log(fastE1List(gig1List()));
