
//send post request on server MAMP
export const postData = async (url, data) => {
  const result = await fetch(url, {
    method: "POST",
    /* json-server
    headers: {
    'Content-type': 'application/json'
    }, */
    body: data
  });
  //return await result.json(); //json-server
  return await result.text();
};