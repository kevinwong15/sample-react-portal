const delay = (ms) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
  return promise;
};

const signInWithEmail = ({ userName, password }) => {
  const childPromise = new Promise((resolve, reject) => {
    let isAuth = false;
    if ((password === "12345")) isAuth = true;
    if (isAuth === true) {
      resolve(true);
    } else {
      reject(false);
    }
  });
  return childPromise;
};

const authService = async (obj) => {
  await delay(1000);
  return signInWithEmail(obj);
};

export { authService };
