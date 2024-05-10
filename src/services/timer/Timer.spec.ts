import { ClassTimer } from "./Timer";

describe("Timer", () => {
  it("should start a timer for 3 seconds", () => {
    //arrange
    let timer = new ClassTimer(3);

    //act
    timer.Start();

    //assert
    setTimeout(() => {
      expect(timer.GetCompleted()).toBeTruthy();
    }, 3);
  });
});
