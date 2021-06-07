async function signup(client, newUser) {
  try {
    const result = await client.db().collection("users").insertOne(newUser);
    return result;
  } catch (err) {
    return err.message;
  }
}

module.exports = {
  signup,
};
