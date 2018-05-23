import connection from '../mysqlInit';

const executeQuery = () =>
  new Promise((resolve, reject) => {
    connection.query('SELECT * FROM photo_labels LIMIT 100', (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });

const getIndex = ctx => {
  ctx.body = {
    success: true,
    data: {
      name: 'APP NAME',
      version: 'APP_VERSION',
    },
  };
};

const getPhotoLabel = async ctx => {
  const result = await executeQuery();
  const data = {};
  result.forEach(item => {
    const apartmentId = String(item.apartment_id);

    if (!data[item.name]) {
      data[item.name] = {
        apartmentId: item.apartment_id,
        photo: `https://storage.googleapis.com/parser-segment/${apartmentId.substr(
          0,
          2
        )}/${apartmentId.substr(2, 2)}/${apartmentId.substr(
          4,
          2
        )}/${apartmentId.substr(6, 2)}/${apartmentId}/${apartmentId}/original/${
          item.name
        }`,
        labels: [],
      };
    }

    data[item.name].labels.push({
      type: item.type,
      score: item.score,
    });
  });

  ctx.body = {
    success: true,
    data,
  };
};

export default {
  getIndex,
  getPhotoLabel,
};
