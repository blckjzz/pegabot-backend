import sentiment from 'multilang-sentiment';

export default async (data) => {
  let sentimentNeutralSum = 0;

  data.forEach((current) => {
    let { lang } = current;
    const { text } = current;
    let res = {};

    if (lang === 'und') {
      lang = null;
      res = sentiment(text);
    } else {
      res = sentiment(text, lang);
    }

    if (res.comparative === 0) sentimentNeutralSum += 1;
  });

  const scoreSentiment = sentimentNeutralSum / data.length;
  const weight = 2;

  return [scoreSentiment, weight];
};
