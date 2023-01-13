import axios from "axios";

const APIURL = `https://fadeshare.com/react/api/reactlogin`;

async function authenticate(nik, password) {
  const url = APIURL;

  const response = await axios.post(url, {
    nik: nik,
    password: password,
  });

  const id = response.data[0].id;

  return id;
}

export function login(nik, password) {
  return authenticate(nik, password);
}

// async function authenticate(nik, password) {
//   const APIURL = `https://fadeshare.com/react/api/reactlogin`;

//   const headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   };

//   const response = await fetch(APIURL, {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify({ nik: nik, password: password }),
//   })
//     .then((response) => response.json())
//     .then((json) => {
//       const uid = json[0].id;
//       const dept = json[0].dept;
//       const name = json[0].name;
//       console.log(uid, dept, name);
//       return uid;
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//   const id = response.id;

//   return id;
// }

// export async function login(nik, password) {
//   await authenticate(nik, password);
// }
