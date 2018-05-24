const byline = require('byline');
const moment = require('moment');

moment.locale('ja');

const lines = [];

byline(process.stdin, { keepEmptyLines: true }).on('data', data => {
  const line = data.toString();

  if (!line) {
    lines.reverse().forEach(l => console.log(l));
    process.stdin.end();
    return;
  }

  const [
    date,
    fromType,
    from,
    toType,
    to,
    balance,
    amount,
  ] = line.replace(/,|¥/g, '').split(' ');

  // console.log({
  //   date,
  //   fromType,
  //   from,
  //   toType,
  //   to,
  //   balance,
  //   amount,
  // });

  lines.push([
    moment(date, 'MM/DD').format('l'),
    [fromType, from, toType, to].join(' '),
    amount,
    Number(amount) >= 0 ? '1' : '0',
  ].join(','));
});
