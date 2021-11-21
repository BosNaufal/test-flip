import { createFilterListByQuery } from "utils/data";

describe("Data Utilities Functions", () => {
  describe("createFilterListByQuery()", () => {
    const LIST = [
      { sender: "Naufal", amount: 456000, bank: "Jago" },
      { sender: "Bejo", amount: 100000, bank: "BRI" },
      { sender: "Bambang", amount: 90000, bank: "BTPN" },
    ];

    it("filter correctly with default anchor keys", () => {
      const filterListByQuery = createFilterListByQuery(LIST);
      // filter by sender
      expect(filterListByQuery("nau")).toStrictEqual([LIST[0]]);
      // filter by sender and bank
      expect(filterListByQuery("B")).toStrictEqual([LIST[1], LIST[2]]);
      // filter by amount
      expect(filterListByQuery("10")).toStrictEqual([LIST[1]]);
    });

    it("filter correctly with custom anchor keys", () => {
      const filterListByQuery = createFilterListByQuery(LIST, [
        "bank",
        "amount",
      ]);
      // filter by sender
      expect(filterListByQuery("nau")).toStrictEqual([]);
      // filter by bank
      expect(filterListByQuery("J")).toStrictEqual([LIST[0]]);
      // filter by amount
      expect(filterListByQuery("45")).toStrictEqual([LIST[0]]);
      // filter by sender and bank
      expect(filterListByQuery("B")).toStrictEqual([LIST[1], LIST[2]]);
    });

    it("ignoring character case", () => {
      const filterListByQuery = createFilterListByQuery(LIST);
      // filter by sender
      expect(filterListByQuery("NAU")).toStrictEqual([LIST[0]]);
      expect(filterListByQuery("nau")).toStrictEqual([LIST[0]]);
      expect(filterListByQuery("NaU")).toStrictEqual([LIST[0]]);
      // filter by sender and bank
      expect(filterListByQuery("B")).toStrictEqual([LIST[1], LIST[2]]);
      expect(filterListByQuery("b")).toStrictEqual([LIST[1], LIST[2]]);
      // filter by bank
      expect(filterListByQuery("Jago")).toStrictEqual([LIST[0]]);
      expect(filterListByQuery("jaGO")).toStrictEqual([LIST[0]]);
    });
  });
});
