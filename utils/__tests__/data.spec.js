import { createFilterListByQuery, createSortingListByDate, createSortingListByString } from "utils/data";

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

  describe("createSortingListByDate()", () => {
    const LIST = [
      { sender: "Naufal", date: "2021-11-22 00:00:00" },
      { sender: "Bejo", date: "2021-11-22 11:11:11" },
      { sender: "Bambang", date: "2021-01-01 00:00:00" },
    ];

    it("sorting correctly", () => {
      const sortByDate = createSortingListByDate(LIST, "date");
      expect(sortByDate("DESC")).toStrictEqual([
        LIST[1], 
        LIST[0],
        LIST[2],
      ]);
      expect(sortByDate("ASC")).toStrictEqual([
        LIST[2],
        LIST[0],
        LIST[1], 
      ]);
    });
  });

  describe("createSortingListByString()", () => {
    const LIST = [
      { sender: "Naufal", date: "2021-11-22 00:00:00" },
      { sender: "Bejo", date: "2021-11-22 11:11:11" },
      { sender: "Bambang", date: "2021-01-01 00:00:00" },
      { sender: "Zara", date: "2021-01-01 00:00:00" },
    ];

    it("sorting correctly", () => {
      const sortByDate = createSortingListByString(LIST, "sender");
      expect(sortByDate("DESC")).toStrictEqual([
        LIST[3],
        LIST[0],
        LIST[1], 
        LIST[2],
      ]);
      expect(sortByDate("ASC")).toStrictEqual([
        LIST[2],
        LIST[1], 
        LIST[0],
        LIST[3],
      ]);
    });
  });
});
