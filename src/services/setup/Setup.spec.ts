import { mockDeep } from "jest-mock-extended";
import { Setup } from "./Setup";
import { Database } from "../db/Database";
import { mongoConfig } from "../config/Config";

describe("Setup", () => {
  it("should load auctions from json file", () => {
    //arrange
    const filepath = "data/Auctions.json";
    const mockDb = mockDeep<Database>();

    //act
    const loadAuctions = new Setup(mockDb, mongoConfig).LoadAuctions(filepath);

    //assert
    expect(loadAuctions.auctions.length).toBeGreaterThan(0);
    expect(loadAuctions && typeof loadAuctions === "object").toBe(true);
  });
});
