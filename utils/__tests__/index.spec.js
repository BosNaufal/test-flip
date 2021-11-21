import { ISOStringDateToLocaleDate } from "utils";

describe("Utilities Functions", () => {
  describe("bankNameToUppercase()", () => {
    it("convert all char to uppercase if char length is 3", () => {
      expect(ISOStringDateToLocaleDate("2021-11-16 07:45:20")).toBe("16 November 2021");
      expect(ISOStringDateToLocaleDate("2021-1-06 07:45:20")).toBe("6 Januari 2021");
    });
  });
  describe("ISOStringDateToLocaleDate()", () => {
    it("convert correctly", () => {
      expect(ISOStringDateToLocaleDate("2021-11-16 07:45:20")).toBe("16 November 2021");
      expect(ISOStringDateToLocaleDate("2021-1-06 07:45:20")).toBe("6 Januari 2021");
    });
  });
});
