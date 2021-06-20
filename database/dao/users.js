async function signup(client, newUser) {
  try {
    const result = await client.db().collection("users").insertOne(newUser);
    return result;
  } catch (err) {
    return err.message;
  }
}

async function findEmail(client, email) {
  try {
    const user = await client
      .db()
      .collection("users")
      .findOne({ email }); // return only _id, which is returned unless explicitely stated - https://docs.mongodb.com/drivers/node/current/fundamentals/crud/read-operations/project/
    return user;
  } catch (err) {
    throw new Error(
      "There was a problem signing you up. Please try again later."
    );
  }
}

module.exports = {
  signup,
  findEmail,
};
