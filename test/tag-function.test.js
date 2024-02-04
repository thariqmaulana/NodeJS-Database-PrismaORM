
function tagFunction(array, ...args) {
  console.info(array);
  console.info(args);
}

test("tag function", () => {
  const name = "Thariq";

  tagFunction`Halo ${name}!, apa kabarmu?`;
  tagFunction`${name} sedang belajar database`;
})

test("tag function sql", () => {
  const name = "Ahmad";
  const age = 30;

  tagFunction`SELECT * FROM users WHERE name = ${name} AND age = ${age}`;
})