import { ClassTimer } from "./Timer";

describe("Timer", () => {
  it("should start a timer for 3 seconds", () => {
    //arrange
    let timer = new ClassTimer(3);

    //act
    timer.startTimer();

    //assert
    setTimeout(() => {
      expect(timer.getCompleted()).toBeTruthy();
    }, 3);
  });
});
