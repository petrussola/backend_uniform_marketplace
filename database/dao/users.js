async function signup(client, newUser) {
  const result = await client.db().collection("users").insertOne(newUser);
  return result;
//   console.log(
//     `New listing created with the following id: ${result.insertedId}`
//   );
}

module.exports = {
  signup,
};
