// ('https://ds.smartape.net/api/dci/v3/server?orderby=configuration%20asc&limit=4,18&where=(owner_email%20EQ%20%27gamebrolive@gmail.com%27)+AND+is_new%20EQ%20false+AND+location_id%20EQ%203');

// ('https://ds.smartape.net/api/dci/v3/server?orderby=owner_email%20asc&limit=0,8&where=(owner_email%20IS%20null)+AND+is_new%20EQ%20false');

// const outList = (server) => {
//   const reuslt = `${server.barcode} ${server.rack.name} юнит ${server.unit}`;

//   const switchInfo = (switchArray) => {
//     return switchArray.map((el) => `${el.switch_name} ${el.description}`).join('\n');
//   };

//   const conn = switchInfo(server.switch_connection);
//   return `${reuslt}\n${conn}\n`;
// };

// console.log(srcObj.list.map((el) => outList(el)).join('\n'));



const processJson = (jsonData) => {
  const parseConfig = (serverConfigString) => {
    // E-2146G-64Gb-1920SSD-3840SSD
    const ramDataEnd = serverConfigString.indexOf("Gb") + 1;
    const procAndRam = serverConfigString.slice(0, ramDataEnd).split('-');
    const ramConfig = procAndRam.slice(-1);
    const cpuConfig = procAndRam.slice( 1, procAndRam.lenght -1);

    return {cpuConfig, ramConfig}
  };

  const data = jsonData.list.map((el) => {
    console.log(parseConfig(el.configuration));
  });
  return data;
};

processJson(freeDs);