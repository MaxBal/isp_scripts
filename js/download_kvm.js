const username = 'username';
const password = 'password';
const kvmUrl = 'https://kvm-name.company.ru';

const getTime = () => {
  var time = '';
  var t = new Date();
  time += t.getFullYear() + '.';
  time += t.getMonth() + '.';
  time += t.getDate() + '.';
  time += t.getHours() + '.';
  time += t.getMinutes() + '.';
  time += t.getSeconds();
  return time;
};

const fromData = `page_id=applet.htm&username=${username}&password=${password}&login=Login&curtime=${getTime()}`;

const formDataObj = {
  body: fromData,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  method: 'post',
};

const loadData = await fetch(`${kvmUrl}/view.htm`, formDataObj).then((resp) => {
  const pid = resp.url.slice(resp.url.indexOf('pid=') + 4);
  const downloadUrl = `${kvmUrl}/viewer.jnlp?pid=${pid}`
  console.log(downloadUrl);

  const aElement = document.createElement('a');
  aElement.setAttribute('download', `viewer${pid}.jnlp`);
  aElement.href = downloadUrl;
  aElement.setAttribute('target', '_blank');
  aElement.click();
  URL.revokeObjectURL(downloadUrl);
});

console.log(loadData);
