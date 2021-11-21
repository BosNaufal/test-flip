import {
  MySqlStringDateToLocaleDate,
  bankNameToUppercase,
  convertToRupiahCurrency,
} from "utils";

describe("Utilities Functions", () => {
  describe("bankNameToUppercase()", () => {
    it("convert all char to uppercase if char length is 4", () => {
      expect(bankNameToUppercase("bri")).toBe("BRI");
      expect(bankNameToUppercase("btpn")).toBe("BTPN");
    });
    it("capitalize if char length is more than 4", () => {
      expect(bankNameToUppercase("mandiri")).toBe("Mandiri");
      expect(bankNameToUppercase("mandiri")).toBe("Mandiri");
    });
  });

  describe("MySqlStringDateToLocaleDate()", () => {
    it("convert correctly", () => {
      expect(MySqlStringDateToLocaleDate("2021-11-16 07:45:20")).toBe(
        "16 November 2021"
      );
      expect(MySqlStringDateToLocaleDate("2021-1-06 07:45:20")).toBe(
        "6 Januari 2021"
      );
    });
  });

  describe("convertToRupiahCurrency()", () => {
    it("convert correctly", () => {
      expect(convertToRupiahCurrency(10000)).toBe("10.000");
      expect(convertToRupiahCurrency(200)).toBe("200");
      expect(convertToRupiahCurrency(350000)).toBe("350.000");
    });
  });
});
