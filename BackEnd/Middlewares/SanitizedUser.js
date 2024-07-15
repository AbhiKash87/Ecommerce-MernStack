const SanitizedUser = (user) => {
  // console.log("sanitized");
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    addresses: user.addresses,
    orders: user.orders,
  };
};

module.exports = SanitizedUser;
