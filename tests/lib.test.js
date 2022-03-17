const lib = require("../lib");

describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(857);
    expect(result).toBe(857);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is zero", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Mosh");
    expect(result).toContain("Mosh");
  });
});

describe("getCurrencies", () => {
  it("should return the supported currencies.", () => {
    const result = lib.getCurrencies();

    expect(result).toEqual(expect.arrayContaining(["USD", "EUR", "AUD"]));
  });
});

describe("getProduct", () => {
  it("Should return product with the given id", () => {
    const result = lib.getProduct(1);
    // expect(result).toStrictEqual({ id: 1, price: 10 });
    // expect(result).tohaveProperty('id', 1)
    expect(result).toMatchObject({ id: 1, price: 10 });
  });
});

describe("registerUser", () => {
  it("Should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("nathan");
    expect(result).toMatchObject({ username: "nathan" });
    expect(result.id).toBeGreaterThan(0);
  });
});
