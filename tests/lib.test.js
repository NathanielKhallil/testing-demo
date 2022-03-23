const lib = require("../lib");
const exercise = require("../exercise1");
const db = require("../db");
const mail = require("../mail");

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

describe("fizzBuzz", () => {
  it("Should throw an error if the input is NaN", () => {
    expect(() => {
      exercise.fizzBuzz("15").toThrow();
      exercise.fizzBuzz(null).toThrow();
      exercise.fizzBuzz(undefined).toThrow();
      exercise.fizzBuzz({}).toThrow();
    });
  });

  it("Should return FizzBuzz if the number is divisible by both 3 and 5", () => {
    const result = exercise.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("Should return Fizz if the number is only divisible by 3", () => {
    const result = exercise.fizzBuzz(3);
    expect(result).toBe("Fizz");
  });

  it("Should return Buzz if the number is only divisible 5", () => {
    const result = exercise.fizzBuzz(25);
    expect(result).toBe("Buzz");
  });

  it("Should return the input if the number is neither divisible 3 or 5", () => {
    const result = exercise.fizzBuzz(22);
    expect(result).toBe(22);
  });
});

describe("discount", () => {
  it("should apply 10% discount if the customer has 10+ points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("Should notify the customer by email when they place their order.", () => {
    // const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1)
    // mockFunction.mockResolvedValue(1)
    // mockFunction.mockRejectedValue(new Error('....'))
    // const result = await mockFunction();
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    // db.getCustomerSync = function (customerId) {
    //   return { email: "a" };
    // };
    mail.send = jest.fn();
    // let mailSent = false;
    // mail.send = function (email, message) {
    //   mailSent = true;
    // };

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    w;
  });
});
